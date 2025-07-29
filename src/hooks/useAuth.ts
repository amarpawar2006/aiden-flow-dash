import { useState, useEffect, useContext, createContext } from 'react';
import { User, AuthState } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

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
  const [session, setSession] = useState<Session | null>(null);

  // Real Supabase authentication
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session?.user) {
          const profile = await fetchUserProfile(session.user);
          setAuthState({
            user: profile,
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
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user).then(profile => {
          setAuthState({
            user: profile,
            isLoading: false,
            isAuthenticated: true,
          });
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<User> => {
    try {
      const { data: profile } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (profile) {
        return {
          id: profile.id,
          email: supabaseUser.email || '',
          name: profile.full_name || '',
          role: profile.role || 'employee',
          avatar_url: profile.avatar_url,
          contact_info: {
            phone: profile.phone,
            location: profile.location,
          },
          skills: profile.skills || [],
          strengths: profile.strengths || [],
          created_at: profile.created_at,
          updated_at: profile.updated_at,
        };
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }

    // Fallback if no profile found
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.email?.split('@')[0] || 'User',
      role: 'employee',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
        throw new Error(error.message);
      }

      // Auth state will be updated via onAuthStateChange
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
    await supabase.auth.signOut();
    setSession(null);
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const updateUser = async (userData: Partial<User>) => {
    if (authState.user && session) {
      try {
        const { error } = await (supabase as any)
          .from('profiles')
          .update({
            full_name: userData.name,
            phone: userData.contact_info?.phone,
            location: userData.contact_info?.location,
            skills: userData.skills,
            strengths: userData.strengths,
          })
          .eq('id', authState.user.id);

        if (!error) {
          const updatedUser = { ...authState.user, ...userData, updated_at: new Date().toISOString() };
          setAuthState(prev => ({
            ...prev,
            user: updatedUser,
          }));
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
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