import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  console.log('ProtectedRoute - Current user:', user);
  console.log('ProtectedRoute - Required role:', requiredRole);

  if (!user) {
    // Not logged in
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Wrong role
    console.log('ProtectedRoute - Wrong role, redirecting to appropriate dashboard');
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }

  console.log('ProtectedRoute - Access granted');
  return children;
};

export default ProtectedRoute;
