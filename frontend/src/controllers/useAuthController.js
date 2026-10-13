import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react';
import * as authModel from '../models/authModel';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authModel.readSession());

  useEffect(() => {
    const handleUnauthorized = () => {
      authModel.clearSession();
      setSession(null);
    };
    window.addEventListener('employee-management:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('employee-management:unauthorized', handleUnauthorized);
  }, []);

  const value = useMemo(() => ({
    session,
    user: session?.user || null,
    isAuthenticated: Boolean(session?.token),
    signIn: async (credentials) => {
      const nextSession = await authModel.login(credentials);
      setSession(nextSession);
      return nextSession;
    },
    signOut: () => {
      authModel.clearSession();
      setSession(null);
    }
  }), [session]);

  return createElement(AuthContext.Provider, { value }, children);
}

export default function useAuthController() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthController must be used inside AuthProvider');
  }
  return context;
}
