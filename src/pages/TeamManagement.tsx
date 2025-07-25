import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Edit, Trash2, Mail, Phone } from 'lucide-react';

const TeamManagement: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@aiden.ai',
      phone: '+1 234 567 8901',
      role: 'UX Designer',
      status: 'Allocated',
      project: 'Insurance Portal Redesign',
      allocatedFrom: '2024-01-15',
      allocatedTill: '2024-03-15',
      certifications: ['UX Research', 'Figma Advanced'],
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@aiden.ai',
      phone: '+1 234 567 8902',
      role: 'UI Engineer',
      status: 'Free',
      project: 'Available',
      allocatedFrom: null,
      allocatedTill: null,
      certifications: ['React', 'TypeScript'],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@aiden.ai',
      phone: '+1 234 567 8903',
      role: 'UX Designer',
      status: 'Training',
      project: 'Certification Program',
      allocatedFrom: '2024-01-20',
      allocatedTill: '2024-02-20',
      certifications: ['UX Research'],
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Allocated': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Free': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Training': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

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
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Currently Allocated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">61% utilization</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Ready for assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Training</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Project</TableHead>
                <TableHead>Allocation Period</TableHead>
                <TableHead>Certifications</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder-${member.id}.jpg`} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
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
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(member.status)}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.project}</TableCell>
                  <TableCell>
                    {member.allocatedFrom && member.allocatedTill ? (
                      <div className="text-sm">
                        <div>{member.allocatedFrom}</div>
                        <div className="text-muted-foreground">to {member.allocatedTill}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;