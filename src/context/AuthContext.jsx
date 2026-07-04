import { useEffect, useState } from 'react';
import { AuthContext } from './auth';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('signallightstudio_jwt');
      if (token) {
        try {
          const response = await fetch('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } });
          if (response.ok) setIsAuthenticated(true);
          else localStorage.removeItem('signallightstudio_jwt');
        } catch { setIsAuthenticated(false); }
      }
      setIsLoading(false);
    };
    verifyToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      if (!response.ok) {
        const data = await response.json();
        return { success: false, error: data.error || 'Login failed' };
      }
      const data = await response.json();
      localStorage.setItem('signallightstudio_jwt', data.token);
      setIsAuthenticated(true);
      return { success: true };
    } catch { return { success: false, error: 'Network error. Could not connect to server.' }; }
  };

  const logout = () => { setIsAuthenticated(false); localStorage.removeItem('signallightstudio_jwt'); };
  if (isLoading) return null;
  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};
