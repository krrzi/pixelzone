import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PerfilAdmin = () => {
  const { usuario } = useAuth();

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-8">
          Perfil de Administrador
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información Personal */}
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
            <h2 className="text-neon-green font-orbitron text-xl font-bold mb-6">
              Información Personal
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 font-inter text-sm">Nombre</p>
                <p className="text-white font-inter text-lg">{usuario.nombre}</p>
              </div>
              <div>
                <p className="text-gray-400 font-inter text-sm">Email</p>
                <p className="text-white font-inter text-lg">{usuario.email}</p>
              </div>
              <div>
                <p className="text-gray-400 font-inter text-sm">Cargo</p>
                <p className="text-neon-green font-orbitron font-bold text-lg">
                  Administrador
                </p>
              </div>
              {usuario.ultimaConexion && (
                <div>
                  <p className="text-gray-400 font-inter text-sm">Última Conexión</p>
                  <p className="text-white font-inter text-lg">
                    {new Date(usuario.ultimaConexion).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Accesos Rápidos */}
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
            <h2 className="text-neon-green font-orbitron text-xl font-bold mb-6">
              Accesos Rápidos
            </h2>
            <div className="space-y-3">
              <Link
                to="/admin"
                className="block border border-neon-green/30 rounded-lg p-4 hover:border-neon-green hover:bg-neon-green/10 transition-colors"
              >
                <p className="text-white font-orbitron font-bold">Dashboard</p>
                <p className="text-gray-400 font-inter text-sm">Ver estadísticas y resumen</p>
              </Link>
              <Link
                to="/admin/productos"
                className="block border border-neon-green/30 rounded-lg p-4 hover:border-neon-green hover:bg-neon-green/10 transition-colors"
              >
                <p className="text-white font-orbitron font-bold">Productos</p>
                <p className="text-gray-400 font-inter text-sm">Gestionar catálogo</p>
              </Link>
              <Link
                to="/admin/proveedores"
                className="block border border-neon-green/30 rounded-lg p-4 hover:border-neon-green hover:bg-neon-green/10 transition-colors"
              >
                <p className="text-white font-orbitron font-bold">Proveedores</p>
                <p className="text-gray-400 font-inter text-sm">Gestionar proveedores</p>
              </Link>
              <Link
                to="/admin/inventario"
                className="block border border-neon-green/30 rounded-lg p-4 hover:border-neon-green hover:bg-neon-green/10 transition-colors"
              >
                <p className="text-white font-orbitron font-bold">Inventario</p>
                <p className="text-gray-400 font-inter text-sm">Controlar stock</p>
              </Link>
              <Link
                to="/admin/pedidos"
                className="block border border-neon-green/30 rounded-lg p-4 hover:border-neon-green hover:bg-neon-green/10 transition-colors"
              >
                <p className="text-white font-orbitron font-bold">Pedidos</p>
                <p className="text-gray-400 font-inter text-sm">Ver y gestionar pedidos</p>
              </Link>
              <Link
                to="/admin/clientes"
                className="block border border-neon-green/30 rounded-lg p-4 hover:border-neon-green hover:bg-neon-green/10 transition-colors"
              >
                <p className="text-white font-orbitron font-bold">Clientes</p>
                <p className="text-gray-400 font-inter text-sm">Ver y gestionar clientes</p>
              </Link>
              <Link
                to="/admin/finanzas"
                className="block border border-neon-green/30 rounded-lg p-4 hover:border-neon-green hover:bg-neon-green/10 transition-colors"
              >
                <p className="text-white font-orbitron font-bold">Finanzas</p>
                <p className="text-gray-400 font-inter text-sm">Ver reportes financieros</p>
              </Link>
              <Link
                to="/"
                className="block border border-neon-green/30 rounded-lg p-4 hover:border-neon-green hover:bg-neon-green/10 transition-colors"
              >
                <p className="text-white font-orbitron font-bold">Ver Sitio</p>
                <p className="text-gray-400 font-inter text-sm">Ir a la página principal</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilAdmin;
