import React, { createContext, useState } from 'react';
import { productos as productosIniciales } from '../data/productos';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  // Usar siempre productosIniciales como fuente de verdad
  const [productos, setProductos] = useState(productosIniciales);

  // Función para agregar un producto
  const agregarProducto = (nuevoProducto) => {
    const productoConId = {
      ...nuevoProducto,
      id: Date.now() // Generar ID único
    };
    setProductos(prev => [...prev, productoConId]);
  };

  // Función para editar un producto
  const editarProducto = (id, datosActualizados) => {
    setProductos(prev => 
      prev.map(producto => 
        producto.id === id ? { ...producto, ...datosActualizados } : producto
      )
    );
  };

  // Función para eliminar un producto
  const eliminarProducto = (id) => {
    setProductos(prev => prev.filter(producto => producto.id !== id));
  };

  // Función para actualizar stock
  const actualizarStock = (id, nuevoStock) => {
    setProductos(prev =>
      prev.map(producto =>
        producto.id === id ? { ...producto, stock: nuevoStock } : producto
      )
    );
  };

  return (
    <ProductsContext.Provider value={{
      productos,
      agregarProducto,
      editarProducto,
      eliminarProducto,
      actualizarStock
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
