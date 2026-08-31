import React, { createContext, useContext, useEffect, useState } from 'react';
import { checkAdminSession, loginAdmin, logoutAdmin, DEFAULT_ADMIN_EMAIL } from './adminAuth';

export interface AdminUser {
  email: string;
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = checkAdminSession();
    if (session.isAuthenticated && session.email) {
      setUser({ email: session.email });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const res = loginAdmin(email, pass);
    if (res.success) {
      setUser({ email: email.trim() || DEFAULT_ADMIN_EMAIL });
      return { success: true };
    }
    return res;
  };

  const logout = async () => {
    logoutAdmin();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
