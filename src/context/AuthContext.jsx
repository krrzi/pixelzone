import React, { createContext, useState, useEffect } from 'react';
import { usuarios } from '../data/usuarios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Limpiamos TODO localStorage para asegurarnos de que no haya datos corruptos
    localStorage.clear();
    setLoading(false);
  }, []);

  const login = (email, password) => {
    console.log('Intentando login con:', { email, password });
    console.log('Usuarios disponibles:', usuarios);
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);
    console.log('Usuario encontrado:', usuarioEncontrado);
    if (usuarioEncontrado) {
      const usuarioData = { ...usuarioEncontrado, ultimaConexion: new Date().toISOString() };
      setUsuario(usuarioData);
      localStorage.setItem('usuario', JSON.stringify(usuarioData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const isAuthenticated = () => usuario !== null;
  const isAdmin = () => usuario?.rol === 'admin';
  const isCliente = () => usuario?.rol === 'cliente';
  const isProveedor = () => usuario?.rol === 'proveedor';
  const isMarketing = () => usuario?.rol === 'marketing';
  const isLogistica = () => usuario?.rol === 'logistica';
  const isSoporte = () => usuario?.rol === 'soporte';
  const hasRole = (roles) => {
    if (!usuario) return false;
    return roles.includes(usuario.rol);
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      loading,
      login,
      logout,
      isAuthenticated,
      isAdmin,
      isCliente,
      isProveedor,
      isMarketing,
      isLogistica,
      isSoporte,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
