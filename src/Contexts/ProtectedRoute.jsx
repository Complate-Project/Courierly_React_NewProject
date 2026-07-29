import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to unauthorized page or login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
