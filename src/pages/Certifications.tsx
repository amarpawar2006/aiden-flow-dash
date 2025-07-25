import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Award, CheckCircle, Clock, Plus } from 'lucide-react';

const Certifications: React.FC = () => {
  const certifications = [
    { id: 1, name: 'UX Research Fundamentals', category: 'UX Design' },
    { id: 2, name: 'Advanced Figma', category: 'Design Tools' },
    { id: 3, name: 'React Development', category: 'Frontend' },
    { id: 4, name: 'TypeScript Mastery', category: 'Programming' },
  ];

  const teamProgress = [
    {
      id: 1,
      name: 'John Doe',
      role: 'UX Designer',
      certifications: [
        { id: 1, completed: true, date: '2024-01-15' },
        { id: 2, completed: true, date: '2024-01-20' },
        { id: 3, completed: false, date: null },
        { id: 4, completed: false, date: null },
      ],
      completionRate: 50,
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      role: 'UI Engineer',
      certifications: [
        { id: 1, completed: false, date: null },
        { id: 2, completed: true, date: '2024-01-10' },
        { id: 3, completed: true, date: '2024-01-25' },
        { id: 4, completed: true, date: '2024-02-01' },
      ],
      completionRate: 75,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'UX Designer',
      certifications: [
        { id: 1, completed: true, date: '2024-01-18' },
        { id: 2, completed: false, date: null },
        { id: 3, completed: false, date: null },
        { id: 4, completed: false, date: null },
      ],
      completionRate: 25,
    },
  ];

  const getCertificationName = (id: number) => {
    return certifications.find(cert => cert.id === id)?.name || 'Unknown';
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 75) return 'text-green-600';
    if (rate >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const overallStats = {
    totalCertifications: certifications.length,
    averageCompletion: Math.round(teamProgress.reduce((acc, member) => acc + member.completionRate, 0) / teamProgress.length),
    completedThisMonth: 5,
    inProgress: 8,
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Certifications</h1>
          <p className="text-muted-foreground">Track team certifications and skill development</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalCertifications}</div>
            <p className="text-xs text-muted-foreground">Skill categories covered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.averageCompletion}%</div>
            <p className="text-xs text-muted-foreground">Team progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.completedThisMonth}</div>
            <p className="text-xs text-muted-foreground">New achievements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Currently learning</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Certifications */}
      <Card>
        <CardHeader>
          <CardTitle>Available Certifications</CardTitle>
          <CardDescription>Skill development programs available to the team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground">{cert.category}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Team Progress</CardTitle>
          <CardDescription>Individual certification progress for each team member</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Overall Progress</TableHead>
                {certifications.map((cert) => (
                  <TableHead key={cert.id} className="text-center min-w-[120px]">
                    {cert.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamProgress.map((member) => (
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
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={getCompletionColor(member.completionRate)}>
                          {member.completionRate}%
                        </span>
                      </div>
                      <Progress value={member.completionRate} className="h-2" />
                    </div>
                  </TableCell>
                  {member.certifications.map((cert, index) => (
                    <TableCell key={index} className="text-center">
                      {cert.completed ? (
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-xs text-muted-foreground">{cert.date}</span>
                        </div>
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400 mx-auto" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Certifications;