import React, { createContext, useState, useEffect, useContext } from 'react';
import { ProductsContext } from './ProductsContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { productos, actualizarStock } = useContext(ProductsContext);

  useEffect(() => {
    const cartLocal = localStorage.getItem('cart');
    if (cartLocal) {
      setCart(JSON.parse(cartLocal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto, cantidad = 1) => {
    const productoEnDB = productos.find(p => p.id === producto.id);
    const itemInCart = cart.find(item => item.id === producto.id);
    const totalEnCart = itemInCart ? itemInCart.cantidad : 0;

    if (totalEnCart + cantidad > productoEnDB.stock) {
      return false; // Indicate insufficient stock
    }

    setCart(prevCart => {
      const itemExistente = prevCart.find(item => item.id === producto.id);
      if (itemExistente) {
        return prevCart.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prevCart, { ...producto, cantidad }];
    });

    // Update stock
    actualizarStock(producto.id, productoEnDB.stock - cantidad);
    return true;
  };

  const removeFromCart = (productoId) => {
    console.log('Removing item with ID:', productoId);
    const itemToRemove = cart.find(i => i.id === productoId);
    if (itemToRemove) {
      console.log('Item to remove found:', itemToRemove);
      const productoEnDB = productos.find(p => p.id === productoId);
      if (productoEnDB) {
        console.log('Restoring stock:', productoEnDB.stock + itemToRemove.cantidad);
        actualizarStock(productoId, productoEnDB.stock + itemToRemove.cantidad);
      }
      setCart(prevCart => {
        const newCart = prevCart.filter(item => item.id !== productoId);
        console.log('New cart after removal:', newCart);
        return newCart;
      });
    } else {
      console.log('Item not found in cart for ID:', productoId);
    }
  };

  const updateQuantity = (productoId, nuevaCantidad) => {
    const item = cart.find(i => i.id === productoId);
    const productoEnDB = productos.find(p => p.id === productoId);
    if (!item || !productoEnDB) return;

    const diferencia = nuevaCantidad - item.cantidad;
    if (diferencia > productoEnDB.stock) return; // Insufficient stock

    if (nuevaCantidad <= 0) {
      removeFromCart(productoId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productoId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );

    updateStock(productoId, productoEnDB.stock - diferencia);
  };

  const clearCart = () => {
    // Return all items to stock
    cart.forEach(item => {
      const productoEnDB = productos.find(p => p.id === item.id);
      if (productoEnDB) {
        actualizarStock(item.id, productoEnDB.stock + item.cantidad);
      }
    });
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.cantidad, 0);
  };

  const isInCart = (productoId) => {
    return cart.some(item => item.id === productoId);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
