import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FolderPlus, Calendar, Users, Clock } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Insurance Portal Redesign',
      description: 'Complete UX/UI overhaul of the main insurance customer portal',
      status: 'In Progress',
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      team: ['John Doe', 'Alice Smith'],
      category: 'Insurance',
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'New mobile application for banking services',
      status: 'Planning',
      progress: 15,
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      team: ['Mike Johnson', 'Sarah Wilson'],
      category: 'Finance',
    },
    {
      id: 3,
      title: 'AI Chatbot Interface',
      description: 'Design interface for customer service AI chatbot',
      status: 'Completed',
      progress: 100,
      startDate: '2023-11-01',
      endDate: '2024-01-01',
      team: ['Emma Davis'],
      category: 'POC',
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      description: 'Internal analytics dashboard for business intelligence',
      status: 'In Progress',
      progress: 40,
      startDate: '2024-01-20',
      endDate: '2024-04-20',
      team: ['Tom Brown', 'Lisa Wilson'],
      category: 'Other',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Planning': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'On Hold': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Insurance': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Finance': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'POC': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'Other': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Manage and track all UX/UI projects</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <FolderPlus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Optimal range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5mo</div>
            <p className="text-xs text-muted-foreground">Per project</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="card-hover">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge className={getCategoryColor(project.category)}>
                  {project.category}
                </Badge>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{project.startDate} - {project.endDate}</span>
              </div>

              {/* Team */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{project.team.join(', ')}</span>
              </div>

              {/* Days remaining */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {project.status === 'Completed' 
                    ? 'Completed' 
                    : `${Math.max(0, Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days remaining`
                  }
                </span>
              </div>

              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;