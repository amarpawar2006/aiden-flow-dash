import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, FolderOpen, Award, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total UXD', value: '8', icon: Users, color: 'text-blue-600' },
    { title: 'Total UXE', value: '5', icon: Users, color: 'text-green-600' },
    { title: 'Projects Live', value: '12', icon: FolderOpen, color: 'text-purple-600' },
    { title: 'Free Resources', value: '3', icon: TrendingUp, color: 'text-orange-600' },
    { title: 'Trainings Pending', value: '7', icon: Award, color: 'text-red-600' },
  ];

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

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Allocation</CardTitle>
            <CardDescription>Current project assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Chart will be rendered here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest team updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">John completed UX Research certification</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm">New project assigned to Sarah</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-sm">Training session scheduled for next week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;