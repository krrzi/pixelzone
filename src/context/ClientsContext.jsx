import React, { createContext, useState, useEffect } from 'react';

// Clientes ficticios iniciales
const clientesIniciales = [
  { id: 1, nombre: 'Bruno Villena', email: 'cliente@pixelzone.com', fechaRegistro: '2026-01-15', totalCompras: 2, historialPedidos: [1, 7], totalGastado: 0, telefono: '', direccion: '' },
  { id: 2, nombre: 'Cliente Prueba', email: 'prueba@ejemplo.com', fechaRegistro: '2026-05-20', totalCompras: 1, historialPedidos: [2], totalGastado: 0, telefono: '', direccion: '' },
  { id: 3, nombre: 'Juan Pérez', email: 'juan@ejemplo.com', fechaRegistro: '2026-03-10', totalCompras: 4, historialPedidos: [3], totalGastado: 0, telefono: '', direccion: '' },
  { id: 4, nombre: 'María López', email: 'maria@ejemplo.com', fechaRegistro: '2026-02-28', totalCompras: 3, historialPedidos: [4], totalGastado: 0, telefono: '', direccion: '' },
  { id: 5, nombre: 'Carlos Gómez', email: 'carlos@ejemplo.com', fechaRegistro: '2026-04-05', totalCompras: 5, historialPedidos: [5], totalGastado: 0, telefono: '', direccion: '' },
  { id: 6, nombre: 'Ana Ruiz', email: 'ana@ejemplo.com', fechaRegistro: '2026-06-01', totalCompras: 1, historialPedidos: [6], totalGastado: 0, telefono: '', direccion: '' }
];

export const ClientsContext = createContext();

export const ClientsProvider = ({ children, pedidos }) => {
  // Cargar clientes desde localStorage o usar los iniciales
  const [clientes, setClientes] = useState(() => {
    const clientesGuardados = localStorage.getItem('pixelzone-clientes');
    return clientesGuardados ? JSON.parse(clientesGuardados) : clientesIniciales;
  });

  // Persistir en localStorage cuando cambien los clientes
  useEffect(() => {
    localStorage.setItem('pixelzone-clientes', JSON.stringify(clientes));
  }, [clientes]);

  // Obtener pedidos por cliente
  const getPedidosPorCliente = (emailCliente) => {
    return pedidos.filter(p => p.email === emailCliente);
  };

  // Registrar o actualizar cliente con nueva compra
  const registrarCompraCliente = (emailCliente, nombreCliente, pedidoId, montoTotal) => {
    setClientes(prev => {
      const clienteExistente = prev.find(c => c.email === emailCliente);
      if (clienteExistente) {
        return prev.map(c => 
          c.id === clienteExistente.id ? {
            ...c,
            totalCompras: c.totalCompras + 1,
            historialPedidos: [...c.historialPedidos, pedidoId],
            totalGastado: (c.totalGastado || 0) + montoTotal
          } : c
        );
      } else {
        // Crear nuevo cliente
        return [...prev, {
          id: prev.length > 0 ? Math.max(...prev.map(c => c.id)) + 1 : 1,
          nombre: nombreCliente,
          email: emailCliente,
          fechaRegistro: new Date().toISOString().split('T')[0],
          totalCompras: 1,
          historialPedidos: [pedidoId],
          totalGastado: montoTotal,
          telefono: '',
          direccion: ''
        }];
      }
    });
  };

  // Actualizar datos del cliente
  const actualizarCliente = (emailCliente, datos) => {
    setClientes(prev => {
      return prev.map(c => 
        c.email === emailCliente ? { ...c, ...datos } : c
      );
    });
  };

  return (
    <ClientsContext.Provider value={{
      clientes,
      getPedidosPorCliente,
      registrarCompraCliente,
      actualizarCliente
    }}>
      {children}
    </ClientsContext.Provider>
  );
};
