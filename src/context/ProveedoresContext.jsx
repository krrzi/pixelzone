import React, { createContext, useState, useEffect, useContext } from 'react';
import { proveedores as proveedoresIniciales } from '../data/proveedores';
import { ordenesCompra as ordenesIniciales } from '../data/ordenesCompra';
import { ProductsContext } from './ProductsContext';

export const ProveedoresContext = createContext();

export const ProveedoresProvider = ({ children }) => {
  const [proveedores, setProveedores] = useState(() => {
    const saved = localStorage.getItem('pixelzone_proveedores');
    return saved ? JSON.parse(saved) : proveedoresIniciales;
  });

  const [ordenesCompra, setOrdenesCompra] = useState(() => {
    const saved = localStorage.getItem('pixelzone_ordenesCompra');
    return saved ? JSON.parse(saved) : ordenesIniciales;
  });

  const { actualizarStock } = useContext(ProductsContext);

  useEffect(() => {
    localStorage.setItem('pixelzone_proveedores', JSON.stringify(proveedores));
  }, [proveedores]);

  useEffect(() => {
    localStorage.setItem('pixelzone_ordenesCompra', JSON.stringify(ordenesCompra));
  }, [ordenesCompra]);

  const agregarOrden = (nuevaOrden) => {
    const ordenConId = {
      ...nuevaOrden,
      id: Date.now(),
      númeroOrden: `OC-${new Date().getFullYear()}-${String(ordenesCompra.length + 1).padStart(3, '0')}`
    };
    setOrdenesCompra(prev => [...prev, ordenConId]);
  };

  const actualizarEstadoOrden = (ordenId, nuevoEstado) => {
    setOrdenesCompra(prev => 
      prev.map(orden => {
        if (orden.id === ordenId && nuevoEstado === 'Recibido' && orden.estado !== 'Recibido') {
          orden.productos.forEach(item => {
            const producto = require('../data/productos').productos.find(p => p.id === item.productoId);
            if (producto) {
              actualizarStock(item.productoId, producto.stock + item.cantidad);
            }
          });
        }
        return orden.id === ordenId ? { ...orden, estado: nuevoEstado } : orden;
      })
    );
  };

  const crearProveedor = (nuevoProveedor) => {
    const proveedorConId = {
      ...nuevoProveedor,
      id: Date.now()
    };
    setProveedores(prev => [...prev, proveedorConId]);
  };

  const editarProveedor = (proveedorId, datosActualizados) => {
    setProveedores(prev => 
      prev.map(proveedor => 
        proveedor.id === proveedorId ? { ...proveedor, ...datosActualizados } : proveedor
      )
    );
  };

  const activarProveedor = (proveedorId) => {
    setProveedores(prev =>
      prev.map(p =>
        p.id === proveedorId ? { ...p, estado: 'activo' } : p
      )
    );
  };

  const desactivarProveedor = (proveedorId) => {
    setProveedores(prev =>
      prev.map(p =>
        p.id === proveedorId ? { ...p, estado: 'inactivo' } : p
      )
    );
  };

  const eliminarProveedor = (proveedorId) => {
    setProveedores(prev => prev.filter(p => p.id !== proveedorId));
  };

  const getProveedorByEmail = (email) => {
    return proveedores.find(p => p.email === email);
  };

  return (
    <ProveedoresContext.Provider value={{
      proveedores,
      ordenesCompra,
      agregarOrden,
      actualizarEstadoOrden,
      crearProveedor,
      editarProveedor,
      activarProveedor,
      desactivarProveedor,
      eliminarProveedor,
      getProveedorByEmail
    }}>
      {children}
    </ProveedoresContext.Provider>
  );
};
