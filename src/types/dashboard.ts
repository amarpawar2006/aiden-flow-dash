export interface ProjectAssignment {
  id: string;
  user_id: string;
  project_name: string;
  status: 'allocated' | 'free' | 'training' | 'on_leave';
  allocated_from?: string;
  allocated_till?: string;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  name: string;
  description?: string;
  category: 'cert1' | 'cert2' | 'cert3' | 'cert4';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCertification {
  id: string;
  user_id: string;
  certification_id: string;
  completed: boolean;
  completion_date?: string;
  progress_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'insurance' | 'finance' | 'poc' | 'other';
  thumbnail_url?: string;
  case_study_url?: string;
  description?: string;
  technologies?: string[];
  team_members?: string[];
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_uxd: number;
  total_uxe: number;
  projects_live: number;
  free_resources: number;
  trainings_pending: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}