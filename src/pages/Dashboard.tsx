import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BarChart3, Users, FolderOpen, Award, TrendingUp, Search, Filter, ArrowUpDown, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  current_project?: string;
  allocated_from?: string;
  allocated_till?: string;
  certifications?: string[];
  avatar_url?: string;
}

const Dashboard: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof TeamMember>('full_name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const stats = [
    { title: 'Total UXD', value: '8', icon: Users, color: 'text-blue-600' },
    { title: 'Total UXE', value: '5', icon: Users, color: 'text-green-600' },
    { title: 'Projects Live', value: '12', icon: FolderOpen, color: 'text-purple-600' },
    { title: 'Free Resources', value: '3', icon: TrendingUp, color: 'text-orange-600' },
    { title: 'Trainings Pending', value: '7', icon: Award, color: 'text-red-600' },
  ];

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .order('full_name');

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch team members",
          variant: "destructive",
        });
        return;
      }

      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAndSortedMembers = useMemo(() => {
    let filtered = teamMembers.filter(member => {
      const matchesSearch = member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      const matchesProject = projectFilter === 'all' || member.current_project === projectFilter;
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      
      let matchesDateRange = true;
      if (dateFrom && member.allocated_from) {
        matchesDateRange = new Date(member.allocated_from) >= dateFrom;
      }
      if (dateTo && member.allocated_till) {
        matchesDateRange = matchesDateRange && new Date(member.allocated_till) <= dateTo;
      }

      return matchesSearch && matchesRole && matchesProject && matchesStatus && matchesDateRange;
    });

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [teamMembers, searchTerm, roleFilter, projectFilter, statusFilter, dateFrom, dateTo, sortField, sortDirection]);

  const handleSort = (field: keyof TeamMember) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Allocated': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Free': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Training': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const uniqueRoles = [...new Set(teamMembers.map(m => m.role).filter(Boolean))];
  const uniqueProjects = [...new Set(teamMembers.map(m => m.current_project).filter(Boolean))];

  return (
    <div className="space-y-8 fade-in">
      {/* Hero Section */}
      <div className="dashboard-hero rounded-xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-heading font-bold mb-2">Welcome to Aiden AI</h1>
          <p className="text-xl opacity-90">UX/UI Department Dashboard</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                +{index + 1}% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Data Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Filterable & sortable data grid with all team member details</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {uniqueProjects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Allocated">Allocated</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range Picker */}
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-40">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {dateFrom ? format(dateFrom, "MMM dd") : "From date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-40">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {dateTo ? format(dateTo, "MMM dd") : "To date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Data Grid */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('full_name')}
                      className="h-auto p-0 font-medium"
                    >
                      Name <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('role')}
                      className="h-auto p-0 font-medium"
                    >
                      Role <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('current_project')}
                      className="h-auto p-0 font-medium"
                    >
                      Project <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('status')}
                      className="h-auto p-0 font-medium"
                    >
                      Status <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Allocated From/To</TableHead>
                  <TableHead>Certifications</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading team members...
                    </TableCell>
                  </TableRow>
                ) : filteredAndSortedMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No team members found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar_url} />
                            <AvatarFallback>
                              {member.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.full_name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.current_project || 'Available'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(member.status)}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {member.allocated_from && member.allocated_till ? (
                          <div className="text-sm">
                            <div>{new Date(member.allocated_from).toLocaleDateString()}</div>
                            <div className="text-muted-foreground">to {new Date(member.allocated_till).toLocaleDateString()}</div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.certifications?.slice(0, 2).map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                          {(member.certifications?.length || 0) > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{(member.certifications?.length || 0) - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;