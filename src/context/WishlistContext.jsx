import React, { createContext, useState, useEffect } from 'react';

// Default value to avoid errors
export const WishlistContext = createContext({
  wishlist: [],
  toggleWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {}
});

export const WishlistProvider = ({ children, usuario }) => {
  // Unique localStorage key per user
  const storageKey = usuario ? `pixelzone-wishlist-${usuario.email}` : 'pixelzone-wishlist';
  
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist when wishlist changes
  useEffect(() => {
    if (usuario) {
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    }
  }, [wishlist, usuario, storageKey]);

  // Toggle product in wishlist
  const toggleWishlist = (producto) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === producto.id);
      if (exists) {
        return prev.filter(p => p.id !== producto.id);
      } else {
        return [...prev, producto];
      }
    });
  };

  const isInWishlist = (productoId) => {
    return wishlist.some(p => p.id === productoId);
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider value={{
      wishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
