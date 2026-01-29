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
          const response = await getCurrentUser(storedToken);
          if (response.success && response.data) {
            setUser(response.data);
            setToken(storedToken);
          } else {
            // Invalid token, clear storage
            localStorage.removeItem('netflix_token');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
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
      const response = await loginUser({ email, password });
      
      // Handle response structure: { success, data: { token, user } }
      if (response.success) {
        const token = response.data?.token || (response as any).token;
        const user = response.data?.user || (response as any).user;
        
        if (token && user) {
          setUser(user);
          setToken(token);
          localStorage.setItem('netflix_token', token);
          toast.success(`Welcome back, ${user.name}! 🎬`);
          return true;
        }
      }
      
      toast.error(response.message || 'Login failed');
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await registerUser({ email, password, name });
      
      // Handle response structure: { success, data: { token, user } }
      if (response.success) {
        const token = response.data?.token || (response as any).token;
        const user = response.data?.user || (response as any).user;
        
        if (token && user) {
          setUser(user);
          setToken(token);
          localStorage.setItem('netflix_token', token);
          toast.success(`Welcome to Netflix, ${user.name}! 🎉`);
          return true;
        }
      }
      
      toast.error(response.message || 'Registration failed');
      return false;
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
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
