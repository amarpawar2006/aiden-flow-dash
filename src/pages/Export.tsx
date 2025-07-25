import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Download, 
  FileText, 
  Table, 
  FileSpreadsheet, 
  Calendar as CalendarIcon,
  Filter,
  Database,
  Users,
  FolderOpen,
  Award
} from 'lucide-react';
import { format } from 'date-fns';

const Export: React.FC = () => {
  const [dateRange, setDateRange] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  } | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

  const [selectedDataTypes, setSelectedDataTypes] = React.useState({
    users: true,
    projects: true,
    certifications: true,
    reports: false,
  });

  const exportOptions = [
    {
      id: 'comprehensive',
      title: 'Comprehensive Department Report',
      description: 'Complete overview including all team members, projects, certifications, and analytics',
      icon: Database,
      formats: ['PDF', 'Excel'],
      estimatedSize: '3.2 MB',
      includes: ['Team roster', 'Project status', 'Certification progress', 'Resource allocation'],
    },
    {
      id: 'team',
      title: 'Team Directory Export',
      description: 'Complete team member information with contact details and roles',
      icon: Users,
      formats: ['Excel', 'CSV'],
      estimatedSize: '245 KB',
      includes: ['Member profiles', 'Contact information', 'Role assignments', 'Skill matrices'],
    },
    {
      id: 'projects',
      title: 'Project Analytics Export',
      description: 'Detailed project data including timelines, assignments, and progress',
      icon: FolderOpen,
      formats: ['Excel', 'CSV', 'JSON'],
      estimatedSize: '892 KB',
      includes: ['Project timelines', 'Team assignments', 'Progress tracking', 'Resource utilization'],
    },
    {
      id: 'certifications',
      title: 'Certification Matrix Export',
      description: 'Training and certification progress for all team members',
      icon: Award,
      formats: ['Excel', 'PDF'],
      estimatedSize: '156 KB',
      includes: ['Completion status', 'Progress tracking', 'Skill assessments', 'Training schedules'],
    },
  ];

  const recentExports = [
    {
      name: 'Department Report Q1 2024',
      date: '2024-01-15 14:30',
      format: 'PDF',
      size: '3.2 MB',
      status: 'completed',
    },
    {
      name: 'Team Directory Export',
      date: '2024-01-12 09:15',
      format: 'Excel',
      size: '245 KB',
      status: 'completed',
    },
    {
      name: 'Project Analytics',
      date: '2024-01-10 16:45',
      format: 'CSV',
      size: '892 KB',
      status: 'completed',
    },
    {
      name: 'Certification Matrix',
      date: '2024-01-08 11:20',
      format: 'Excel',
      size: '156 KB',
      status: 'completed',
    },
  ];

  const handleDataTypeChange = (type: string, checked: boolean) => {
    setSelectedDataTypes(prev => ({
      ...prev,
      [type]: checked,
    }));
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF':
        return <FileText className="h-4 w-4" />;
      case 'Excel':
        return <FileSpreadsheet className="h-4 w-4" />;
      case 'CSV':
        return <Table className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Data Export</h1>
        <p className="text-muted-foreground">Export department data in various formats for reporting and analysis</p>
      </div>

      {/* Export Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Export Filters
          </CardTitle>
          <CardDescription>Customize your export parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range as any)}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Format Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Export Format</label>
              <Select defaultValue="excel">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  <SelectItem value="json">JSON (.json)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data Types */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Include Data Types</label>
              <div className="space-y-3 p-3 border rounded-lg">
                {Object.entries(selectedDataTypes).map(([type, checked]) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={checked}
                      onCheckedChange={(checked) => handleDataTypeChange(type, checked as boolean)}
                    />
                    <label htmlFor={type} className="text-sm capitalize">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>Choose from predefined export templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exportOptions.map((option) => (
              <Card key={option.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{option.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Includes:</p>
                      <div className="grid grid-cols-2 gap-1">
                        {option.includes.map((item, index) => (
                          <div key={index} className="text-xs text-muted-foreground">
                            • {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {option.formats.map((format) => (
                          <Badge key={format} variant="outline" className="text-xs">
                            {getFormatIcon(format)}
                            <span className="ml-1">{format}</span>
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{option.estimatedSize}</span>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export {option.title.split(' ')[0]}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Exports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
          <CardDescription>Previously generated exports available for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentExports.map((exportItem, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    {getFormatIcon(exportItem.format)}
                  </div>
                  <div>
                    <h4 className="font-medium">{exportItem.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exportItem.date} • {exportItem.size} • {exportItem.format}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-green-600">
                    {exportItem.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common export tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start p-6 h-auto flex-col">
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <span className="font-medium">Monthly Report</span>
              <span className="text-sm text-muted-foreground">Generate standard monthly report</span>
            </Button>
            <Button variant="outline" className="justify-start p-6 h-auto flex-col">
              <Users className="h-8 w-8 mb-2 text-primary" />
              <span className="font-medium">Team Roster</span>
              <span className="text-sm text-muted-foreground">Current team member list</span>
            </Button>
            <Button variant="outline" className="justify-start p-6 h-auto flex-col">
              <Database className="h-8 w-8 mb-2 text-primary" />
              <span className="font-medium">Full Backup</span>
              <span className="text-sm text-muted-foreground">Complete data export</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Export;