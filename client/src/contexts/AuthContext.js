import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load user from localStorage on initial load
    const savedUser = authService.getCurrentUser();
    console.log('AuthProvider - Initial user:', savedUser);
    setUser(savedUser);
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      console.log('AuthProvider - Registering user:', userData);
      const response = await authService.register(userData);
      console.log('AuthProvider - Registration response:', response);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('AuthProvider - Registration error:', error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      console.log('AuthProvider - Login attempt:', credentials);
      const response = await authService.login(credentials);
      console.log('AuthProvider - Login response:', response);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('AuthProvider - Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('AuthProvider - Logging out');
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: () => !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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
