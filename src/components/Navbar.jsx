import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const { usuario, logout, isAdmin, isCliente } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-dark-bg border-b border-neon-green/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-neon-green font-orbitron text-2xl font-bold">
              PIXEL<span className="text-white">ZONE</span>
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-neon-green transition-colors duration-300 font-inter"
            >
              Inicio
            </Link>

            <Link
              to="/tienda"
              className="text-white hover:text-neon-green transition-colors duration-300 font-inter"
            >
              Tienda
            </Link>

            <Link
              to="/armar-setup"
              className="text-white hover:text-neon-green transition-colors duration-300 font-inter"
            >
              Arma tu Setup
            </Link>

            {!usuario && (
              <Link
                to="/login"
                className="bg-neon-green text-dark-bg px-4 py-2 rounded font-bold hover:bg-neon-green/80 transition-colors duration-300 font-inter"
              >
                Iniciar Sesión
              </Link>
            )}

            {isCliente() && (
              <>
                <Link
                  to="/carrito"
                  className="relative text-white hover:text-neon-green transition-colors duration-300 font-inter"
                >
                  Carrito
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-neon-green text-dark-bg text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {getCartCount()}
                    </span>
                  )}
                </Link>

                <Link
                  to="/perfil"
                  className="text-white hover:text-neon-green transition-colors duration-300 font-inter"
                >
                  Perfil
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-white hover:text-neon-green transition-colors duration-300 font-inter"
                >
                  Cerrar Sesión
                </button>
              </>
            )}

            {isAdmin() && (
              <>
                <Link
                  to="/admin"
                  className="text-white hover:text-neon-green transition-colors duration-300 font-inter"
                >
                  Panel Admin
                </Link>
                <Link
                  to="/admin/clientes"
                  className="text-white hover:text-neon-green transition-colors duration-300 font-inter"
                >
                  Clientes
                </Link>
                <Link
                  to="/admin/finanzas"
                  className="text-white hover:text-neon-green transition-colors duration-300 font-inter"
                >
                  Finanzas
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-white hover:text-neon-green transition-colors duration-300 font-inter"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
