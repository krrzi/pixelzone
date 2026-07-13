import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const { usuario, logout, isAdmin, isCliente, isProveedor, isMarketing, isLogistica, isSoporte } = useAuth();
  const { cart, getCartCount, getCartTotal, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCartOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCartOpen(false);
    }, 300);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderNavLinks = () => {
    if (isCliente()) {
      return (
        <>
          <Link to="/" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Inicio</Link>
          <Link to="/tienda" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Tienda</Link>
          <Link to="/armar-setup" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Arma tu Setup</Link>
          <div
            className="relative text-white hover:text-neon-green transition-colors duration-300 font-inter"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/carrito" className="relative">
              Carrito
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon-green text-dark-bg text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </Link>
            {isCartOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-80 bg-dark-bg border border-neon-green/30 rounded-lg shadow-xl p-4 z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {cart.length === 0 ? (
                  <p className="text-gray-400 font-inter text-center py-4">Tu carrito está vacío</p>
                ) : (
                  <>
                    <div className="max-h-60 overflow-y-auto space-y-3 mb-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img src={item.imagen} alt={item.nombre} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1">
                            <p className="text-white font-inter text-sm line-clamp-1">{item.nombre}</p>
                            <p className="text-neon-green font-orbitron text-xs">S/{item.precio.toFixed(2)} x {item.cantidad}</p>
                          </div>
                          <button onClick={(e) => { e.preventDefault(); removeFromCart(item.id); }} className="text-gray-400 hover:text-red-400 text-sm">✕</button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-neon-green/30 pt-3">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-400 font-inter">Subtotal:</span>
                        <span className="text-neon-green font-orbitron font-bold">S/{getCartTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link to="/carrito" className="flex-1 bg-dark-bg border border-neon-green text-neon-green px-3 py-2 rounded font-inter text-sm text-center hover:bg-neon-green/10 transition-colors">Ver Carrito</Link>
                        <Link to="/carrito" className="flex-1 bg-neon-green text-dark-bg px-3 py-2 rounded font-inter text-sm text-center hover:bg-neon-green/80 transition-colors font-bold">Checkout</Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <Link to="/perfil" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Perfil</Link>
          <button onClick={handleLogout} className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Cerrar Sesión</button>
        </>
      );
    }

    if (isAdmin()) {
      return (
        <>
          <Link to="/" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Inicio</Link>
          <Link to="/admin" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Dashboard</Link>
          <Link to="/admin/productos" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Productos</Link>
          <Link to="/admin/clientes" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Clientes</Link>
          <Link to="/admin/finanzas" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Finanzas</Link>
          <Link to="/admin/rrhh" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">RRHH</Link>
          <Link to="/admin/reportes" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Reportes</Link>
          <button onClick={handleLogout} className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Cerrar Sesión</button>
        </>
      );
    }

    if (isProveedor()) {
      return (
        <>
          <Link to="/" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Inicio</Link>
          <Link to="/proveedor" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Mis Órdenes</Link>
          <Link to="/proveedor/productos" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Mis Productos</Link>
          <Link to="/proveedor/reportes" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Reportes</Link>
          <button onClick={handleLogout} className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Cerrar Sesión</button>
        </>
      );
    }

    if (isMarketing()) {
      return (
        <>
          <Link to="/" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Inicio</Link>
          <Link to="/marketing" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Dashboard</Link>
          <Link to="/marketing/campanas" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Campañas</Link>
          <Link to="/marketing/cupones" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Cupones</Link>
          <Link to="/marketing/reportes" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Reportes</Link>
          <button onClick={handleLogout} className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Cerrar Sesión</button>
        </>
      );
    }

    if (isLogistica()) {
      return (
        <>
          <Link to="/" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Inicio</Link>
          <Link to="/logistica" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">📊 Dashboard</Link>
          <Link to="/logistica/envios" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">🚚 Envíos</Link>
          <Link to="/logistica/couriers" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">👷 Couriers</Link>
          <Link to="/logistica/mapa" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">🗺️ Mapa</Link>
          <Link to="/logistica/reportes" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">📈 Reportes</Link>
          <button onClick={handleLogout} className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Cerrar Sesión</button>
        </>
      );
    }

    if (isSoporte()) {
      return (
        <>
          <Link to="/" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Inicio</Link>
          <Link to="/soporte" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">📊 Dashboard</Link>
          <Link to="/soporte/tickets" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">🎫 Tickets</Link>
          <Link to="/soporte/faq" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">📚 FAQ</Link>
          <Link to="/soporte/reportes" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">📈 Reportes</Link>
          <button onClick={handleLogout} className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Cerrar Sesión</button>
        </>
      );
    }

    return (
      <>
        <Link to="/" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Inicio</Link>
        <Link to="/tienda" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Tienda</Link>
        <Link to="/armar-setup" className="text-white hover:text-neon-green transition-colors duration-300 font-inter">Arma tu Setup</Link>
        <Link to="/login" className="bg-neon-green text-dark-bg px-4 py-2 rounded font-bold hover:bg-neon-green/80 transition-colors duration-300 font-inter">Iniciar Sesión</Link>
      </>
    );
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
            {renderNavLinks()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
