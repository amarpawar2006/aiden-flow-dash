import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Edit, Trash2, Mail, Phone, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  current_project?: string;
  location?: string;
  skills?: string[];
  certifications?: string[];
  avatar_url?: string;
  allocated_from?: string;
  allocated_till?: string;
}

const TeamManagement: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    allocated: 0,
    available: 0,
    training: 0,
  });

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
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (members: TeamMember[]) => {
    const allocated = members.filter(m => m.status === 'Allocated').length;
    const available = members.filter(m => m.status === 'Free').length;
    const training = members.filter(m => m.status === 'Training').length;
    
    setStats({
      total: members.length,
      allocated,
      available,
      training,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Allocated': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Free': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Training': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="space-y-6 fade-in">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground">Manage team members, roles, and project assignments</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Currently Allocated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.allocated}</div>
            <p className="text-xs text-muted-foreground">{stats.total > 0 ? Math.round((stats.allocated / stats.total) * 100) : 0}% utilization</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.available}</div>
            <p className="text-xs text-muted-foreground">Ready for assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Training</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.training}</div>
            <p className="text-xs text-muted-foreground">Skill development</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Overview of all team members and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          {teamMembers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No team members found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Project</TableHead>
                  <TableHead>Allocation Period</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
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
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        {member.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {member.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(member.status)}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.current_project || 'Available'}</TableCell>
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
                        {member.skills?.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {(member.skills?.length || 0) > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{(member.skills?.length || 0) - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;