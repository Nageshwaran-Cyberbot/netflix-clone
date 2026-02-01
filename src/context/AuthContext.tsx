import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../services/api/auth.api';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('netflix_token');
      if (storedToken) {
        try {
          if (import.meta.env.DEV) {
            console.log('[AuthContext] Checking authentication with stored token');
          }
          const response = await getCurrentUser(storedToken);
          if (import.meta.env.DEV) {
            console.log('[AuthContext] getCurrentUser response:', { success: response.success });
          }
          
          if (response.success && response.data) {
            setUser(response.data);
            setToken(storedToken);
            if (import.meta.env.DEV) {
              console.log('[AuthContext] Authentication successful, user set');
            }
          } else {
            // Invalid token, clear storage
            if (import.meta.env.DEV) {
              console.log('[AuthContext] Invalid token, clearing storage');
            }
            localStorage.removeItem('netflix_token');
          }
        } catch (error) {
          console.error('[AuthContext] Auth check failed:', error);
          localStorage.removeItem('netflix_token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      if (import.meta.env.DEV) {
        console.log('[AuthContext] Attempting login for:', email);
      }
      const response = await loginUser({ email, password });
      if (import.meta.env.DEV) {
        console.log('[AuthContext] Login response:', { success: response.success, message: response.message });
      }
      
      // Handle response structure: { success, data: { token, user } }
      if (response.success) {
        const token = response.data?.token || (response as any).token;
        const user = response.data?.user || (response as any).user;
        
        if (token && user) {
          setUser(user);
          setToken(token);
          localStorage.setItem('netflix_token', token);
          toast.success(`Welcome back, ${user.name}!`);
          if (import.meta.env.DEV) {
            console.log('[AuthContext] Login successful');
          }
          return true;
        }
      }
      
      const errorMessage = response.message || 'Login failed';
      if (import.meta.env.DEV) {
        console.log('[AuthContext] Login failed:', errorMessage);
      }
      toast.error(errorMessage);
      return false;
    } catch (error: any) {
      console.error('[AuthContext] Login error:', error);
      const errorMessage = error.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setLoading(true);
      if (import.meta.env.DEV) {
        console.log('[AuthContext] Attempting registration for:', email);
      }
      const response = await registerUser({ email, password, name });
      if (import.meta.env.DEV) {
        console.log('[AuthContext] Registration response:', { success: response.success, message: response.message });
      }
      
      // Handle response structure: { success, data: { token, user } }
      if (response.success) {
        const token = response.data?.token || (response as any).token;
        const user = response.data?.user || (response as any).user;
        
        if (token && user) {
          setUser(user);
          setToken(token);
          localStorage.setItem('netflix_token', token);
          toast.success(`Welcome to Netflix, ${user.name}!`);
          if (import.meta.env.DEV) {
            console.log('[AuthContext] Registration successful');
          }
          return true;
        }
      }
      
      const errorMessage = response.message || 'Registration failed';
      if (import.meta.env.DEV) {
        console.log('[AuthContext] Registration failed:', errorMessage);
      }
      toast.error(errorMessage);
      return false;
    } catch (error: any) {
      console.error('[AuthContext] Registration error:', error);
      const errorMessage = error.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('netflix_token');
    localStorage.removeItem('netflix_wishlist'); // Clear local wishlist
    toast.success('Logged out successfully');
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
