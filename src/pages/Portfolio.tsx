import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Plus, Eye } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('insurance');

  const portfolioProjects = {
    insurance: [
      {
        id: 1,
        title: 'Customer Portal Redesign',
        description: 'Complete overhaul of the insurance customer portal with improved UX and modern design',
        thumbnail: '/placeholder-portfolio-1.jpg',
        caseStudyLink: '#',
        technologies: ['Figma', 'React', 'TypeScript'],
        year: '2024',
      },
      {
        id: 2,
        title: 'Claims Processing App',
        description: 'Mobile application for streamlined insurance claims processing',
        thumbnail: '/placeholder-portfolio-2.jpg',
        caseStudyLink: '#',
        technologies: ['Adobe XD', 'React Native'],
        year: '2023',
      },
    ],
    finance: [
      {
        id: 3,
        title: 'Digital Banking Platform',
        description: 'Next-generation banking platform with enhanced security and user experience',
        thumbnail: '/placeholder-portfolio-3.jpg',
        caseStudyLink: '#',
        technologies: ['Sketch', 'Vue.js', 'Node.js'],
        year: '2024',
      },
      {
        id: 4,
        title: 'Investment Dashboard',
        description: 'Comprehensive investment tracking and analytics dashboard',
        thumbnail: '/placeholder-portfolio-4.jpg',
        caseStudyLink: '#',
        technologies: ['Figma', 'Angular', 'D3.js'],
        year: '2023',
      },
    ],
    poc: [
      {
        id: 5,
        title: 'AI Assistant Interface',
        description: 'Proof of concept for AI-powered customer service interface',
        thumbnail: '/placeholder-portfolio-5.jpg',
        caseStudyLink: '#',
        technologies: ['Figma', 'React', 'Python'],
        year: '2024',
      },
      {
        id: 6,
        title: 'Blockchain Wallet Concept',
        description: 'Conceptual design for a user-friendly blockchain wallet application',
        thumbnail: '/placeholder-portfolio-6.jpg',
        caseStudyLink: '#',
        technologies: ['Adobe XD', 'Prototype'],
        year: '2023',
      },
    ],
    other: [
      {
        id: 7,
        title: 'Internal Analytics Tool',
        description: 'Business intelligence dashboard for internal operations',
        thumbnail: '/placeholder-portfolio-7.jpg',
        caseStudyLink: '#',
        technologies: ['Figma', 'React', 'Chart.js'],
        year: '2024',
      },
    ],
  };

  const categories = [
    { key: 'insurance', label: 'Insurance', count: portfolioProjects.insurance.length },
    { key: 'finance', label: 'Finance', count: portfolioProjects.finance.length },
    { key: 'poc', label: 'POCs', count: portfolioProjects.poc.length },
    { key: 'other', label: 'Other', count: portfolioProjects.other.length },
  ];

  const getTotalProjects = () => {
    return Object.values(portfolioProjects).flat().length;
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground">Showcase of our UX/UI design work across different domains</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalProjects()}</div>
            <p className="text-xs text-muted-foreground">Portfolio pieces</p>
          </CardContent>
        </Card>
        {categories.slice(0, 3).map((category) => (
          <Card key={category.key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{category.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{category.count}</div>
              <p className="text-xs text-muted-foreground">Projects</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Project Portfolio</CardTitle>
          <CardDescription>Browse our work by category</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.key} value={category.key} className="relative">
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.key} value={category.key} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioProjects[category.key as keyof typeof portfolioProjects].map((project) => (
                    <Card key={project.id} className="card-hover group">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <Eye className="h-12 w-12 text-primary/40" />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="secondary" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Case Study
                          </Button>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <Badge variant="outline">{project.year}</Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {portfolioProjects[category.key as keyof typeof portfolioProjects].length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Eye className="h-12 w-12 mx-auto mb-4 opacity-40" />
                    <p>No projects in this category yet.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;