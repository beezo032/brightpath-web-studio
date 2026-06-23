import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token and verify it with the backend on load
    const verifyToken = async () => {
      const token = localStorage.getItem('brightpath_jwt');
      if (token) {
        try {
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            // Token invalid or expired
            localStorage.removeItem('brightpath_jwt');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Token verification failed", error);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('brightpath_jwt', data.token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Could not connect to server.' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('brightpath_jwt');
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
