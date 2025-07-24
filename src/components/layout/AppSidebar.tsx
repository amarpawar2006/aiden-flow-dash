import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Award,
  Settings,
  User,
  LogOut,
  BarChart3,
  FileText,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
    roles: ['super_admin', 'leadership', 'employee'],
  },
  {
    title: 'Team Management',
    url: '/team',
    icon: Users,
    roles: ['super_admin', 'leadership'],
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: FolderOpen,
    roles: ['super_admin', 'leadership', 'employee'],
  },
  {
    title: 'Certifications',
    url: '/certifications',
    icon: Award,
    roles: ['super_admin', 'leadership', 'employee'],
  },
  {
    title: 'Portfolio',
    url: '/portfolio',
    icon: Building,
    roles: ['super_admin', 'leadership', 'employee'],
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: BarChart3,
    roles: ['super_admin', 'leadership'],
  },
  {
    title: 'My Profile',
    url: '/profile',
    icon: User,
    roles: ['employee'],
  },
];

const adminItems = [
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    roles: ['super_admin'],
  },
  {
    title: 'Export Data',
    url: '/export',
    icon: FileText,
    roles: ['super_admin', 'leadership'],
  },
];

export const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  const getFilteredItems = (items: typeof navigationItems) => {
    return items.filter(item => user && item.roles.includes(user.role));
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">A</span>
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-heading font-bold text-sidebar-foreground">Aiden AI</h2>
              <p className="text-xs text-sidebar-accent-foreground">UX/UI Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getFilteredItems(navigationItems).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-primary'
                            : 'text-sidebar-accent-foreground hover:bg-sidebar-accent/50'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        {user && (user.role === 'super_admin' || user.role === 'leadership') && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {getFilteredItems(adminItems).map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-sidebar-accent text-sidebar-primary'
                              : 'text-sidebar-accent-foreground hover:bg-sidebar-accent/50'
                          }`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border p-4">
        {user && (
          <div className="space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar_url} alt={user.name} />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-sidebar-accent-foreground capitalize">
                    {user.role.replace('_', ' ')}
                  </p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};