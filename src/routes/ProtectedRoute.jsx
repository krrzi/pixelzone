import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, loading, isAdmin, isCliente } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-neon-green font-orbitron text-xl">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    if (role === 'admin' && !isAdmin()) {
      return <Navigate to="/" replace />;
    }
    if (role === 'cliente' && !isCliente()) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};
