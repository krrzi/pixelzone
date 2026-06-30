import React, { createContext, useState, useEffect } from 'react';

const usuarios = [
  { id: 1, nombre: "Bruno Villena", email: "cliente@pixelzone.com", password: "cliente123", rol: "cliente" },
  { id: 2, nombre: "Admin PixelZone", email: "admin@pixelzone.com", password: "admin123", rol: "admin" }
];

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem('usuario');
    if (usuarioLocal) {
      setUsuario(JSON.parse(usuarioLocal));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);
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

  return (
    <AuthContext.Provider value={{
      usuario,
      loading,
      login,
      logout,
      isAuthenticated,
      isAdmin,
      isCliente
    }}>
      {children}
    </AuthContext.Provider>
  );
};
