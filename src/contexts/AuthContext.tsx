import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/simulationData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  register: (data: Partial<User> & { password: string }) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sirkulaut_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, _password: string): boolean => {
    const found = DEMO_USERS.find(u => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem('sirkulaut_user', JSON.stringify(found));
      return true;
    }
    return false;
  }, []);

  const loginAsRole = useCallback((role: UserRole) => {
    const found = DEMO_USERS.find(u => u.role === role);
    if (found) {
      setUser(found);
      localStorage.setItem('sirkulaut_user', JSON.stringify(found));
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('sirkulaut_user');
  }, []);

  const register = useCallback((data: Partial<User> & { password: string }): boolean => {
    // Prototype: just create user in memory
    const newUser: User = {
      id: `U${Date.now()}`,
      name: data.name || '',
      email: data.email || '',
      role: data.role || 'pedagang',
      phone: data.phone,
      verified: false,
      createdAt: new Date().toISOString().split('T')[0],
      vesselName: data.vesselName,
      tpiName: data.tpiName,
      companyName: data.companyName,
      businessName: data.businessName,
      businessType: data.businessType,
    };
    setUser(newUser);
    localStorage.setItem('sirkulaut_user', JSON.stringify(newUser));
    return true;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginAsRole, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

