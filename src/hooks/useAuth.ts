import { useState, useEffect, useContext, createContext } from 'react';
import { User, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Mock authentication for demo - replace with real Supabase auth
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for existing session
        const savedUser = localStorage.getItem('aiden-auth-user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Mock login - replace with real Supabase auth
      let user: User;
      
      if (email === 'admin@aiden.ai') {
        user = {
          id: '1',
          email: 'admin@aiden.ai',
          name: 'Super Admin',
          role: 'super_admin',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      } else if (email === 'leader@aiden.ai') {
        user = {
          id: '2',
          email: 'leader@aiden.ai',
          name: 'UX/UI Lead',
          role: 'leadership',
          avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=100&h=100&fit=crop&crop=face',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      } else {
        user = {
          id: '3',
          email: email,
          name: 'UX Designer',
          role: 'employee',
          avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }

      localStorage.setItem('aiden-auth-user', JSON.stringify(user));
      
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('aiden-auth-user');
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem('aiden-auth-user', JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  return {
    ...authState,
    login,
    logout,
    updateUser,
  };
};

export { AuthContext };