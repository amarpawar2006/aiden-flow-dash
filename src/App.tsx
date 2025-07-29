import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import TeamManagement from "./pages/TeamManagement";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Portfolio from "./pages/Portfolio";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Export from "./pages/Export";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/team" element={
              <ProtectedRoute requiredRoles={['super_admin', 'leadership']}>
                <DashboardLayout>
                  <TeamManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Projects />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/certifications" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Certifications />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/portfolio" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Portfolio />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute requiredRoles={['super_admin', 'leadership']}>
                <DashboardLayout>
                  <Reports />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/export" element={
              <ProtectedRoute requiredRoles={['super_admin', 'leadership']}>
                <DashboardLayout>
                  <Export />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
