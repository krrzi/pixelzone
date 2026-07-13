import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NoAutorizado = () => {
  const { usuario } = useAuth();

  const getHomeUrl = () => {
    switch (usuario?.rol) {
      case 'admin':
        return '/admin';
      case 'proveedor':
        return '/proveedor';
      case 'marketing':
        return '/marketing';
      case 'logistica':
        return '/logistica';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <span className="text-8xl">🚫</span>
        </div>
        <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-4">
          No Autorizado
        </h1>
        <p className="text-gray-400 font-inter text-xl mb-8">
          No tienes permiso para acceder a esta sección
        </p>
        <Link
          to={getHomeUrl()}
          className="inline-block bg-neon-green text-dark-bg px-8 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-green/80 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NoAutorizado;
