import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';
import { User } from '../types';
import { setToken, getToken, removeToken } from '../utils/helpers';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await authAPI.getMe();
          setUser(response.data.user);
        } catch (error) {
          removeToken();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await authAPI.login(email, password);
      setToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      const response = await authAPI.register(email, password, name);
      setToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = (): void => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
