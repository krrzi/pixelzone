import React, { createContext, useState, useEffect } from 'react';
import { pedidos as pedidosIniciales } from '../data/pedidos';

export const PedidosContext = createContext();

export const PedidosProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState(() => {
    const pedidosGuardados = localStorage.getItem('pixelzone-pedidos');
    return pedidosGuardados ? JSON.parse(pedidosGuardados) : pedidosIniciales;
  });

  useEffect(() => {
    localStorage.setItem('pixelzone-pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const agregarPedido = (nuevoPedido) => {
    const pedidoConId = {
      ...nuevoPedido,
      id: pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) + 1 : 1
    };
    setPedidos(prev => [...prev, pedidoConId]);
    return pedidoConId;
  };

  const actualizarEstadoPedido = (pedidoId, nuevoEstado) => {
    setPedidos(prev => 
      prev.map(p => p.id === pedidoId ? { ...p, estado: nuevoEstado } : p)
    );
  };

  return (
    <PedidosContext.Provider value={{
      pedidos,
      agregarPedido,
      actualizarEstadoPedido
    }}>
      {children}
    </PedidosContext.Provider>
  );
};
