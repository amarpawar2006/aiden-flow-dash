export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'leadership' | 'employee';
  avatar_url?: string;
  contact_info?: {
    phone?: string;
    location?: string;
  };
  skills?: string[];
  strengths?: string[];
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}