import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { Edit, Mail, Phone, MapPin, Calendar, Award, Briefcase } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const profileData = {
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@aiden.ai',
    phone: '+1 234 567 8901',
    location: 'New York, NY',
    joinDate: '2023-06-15',
    bio: 'Passionate UX designer with 5+ years of experience creating user-centered designs for fintech and insurance applications. Specializes in design systems and accessibility.',
    skills: [
      { name: 'UX Research', level: 90 },
      { name: 'Figma', level: 95 },
      { name: 'Prototyping', level: 85 },
      { name: 'User Testing', level: 80 },
      { name: 'Design Systems', level: 88 },
    ],
    certifications: [
      { name: 'UX Research Fundamentals', completed: true, date: '2024-01-15' },
      { name: 'Advanced Figma', completed: true, date: '2024-01-20' },
      { name: 'React Development', completed: false, progress: 60 },
      { name: 'TypeScript Mastery', completed: false, progress: 30 },
    ],
    currentProject: {
      name: 'Insurance Portal Redesign',
      role: 'Lead UX Designer',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      progress: 65,
    },
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">View and update your profile information</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar_url} alt={profileData.name} />
                  <AvatarFallback className="text-xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{profileData.name}</h3>
                  <p className="text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {profileData.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Project */}
          <Card>
            <CardHeader>
              <CardTitle>Current Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <div>
                  <h4 className="font-medium">{profileData.currentProject.name}</h4>
                  <p className="text-sm text-muted-foreground">{profileData.currentProject.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{profileData.currentProject.progress}%</span>
                </div>
                <Progress value={profileData.currentProject.progress} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                {profileData.currentProject.startDate} - {profileData.currentProject.endDate}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    readOnly
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription>Your technical and design skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Your learning progress and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        cert.completed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        {cert.completed ? (
                          <p className="text-sm text-green-600">Completed {cert.date}</p>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">In Progress</p>
                            <Progress value={cert.progress} className="h-1 w-24" />
                          </div>
                        )}
                      </div>
                    </div>
                    {cert.completed && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Certified
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;