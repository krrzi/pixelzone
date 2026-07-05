import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { WishlistContext } from '../context/WishlistContext';
import { useToast } from '../hooks/useToast';
import Modal from './Modal';

const ProductCard = ({ producto }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToast } = useToast();
  const isFavorite = isInWishlist(producto.id);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);

  const handleAddToCart = () => {
    if (producto.stock === 0) {
      addToast('Producto sin stock', 'error');
      return;
    }

    if (isInCart(producto.id)) {
      setIsDuplicateModalOpen(true);
    } else {
      const success = addToCart(producto);
      if (success) {
        addToast('Producto añadido al carrito!', 'success');
      } else {
        addToast('Stock insuficiente', 'error');
      }
    }
  };

  const handleConfirmAdd = () => {
    const success = addToCart(producto);
    if (success) {
      addToast('Producto añadido al carrito!', 'success');
    } else {
      addToast('Stock insuficiente', 'error');
    }
    setIsDuplicateModalOpen(false);
  };

  return (
    <>
      <div className="bg-dark-bg border border-neon-green/30 rounded-lg overflow-hidden hover:border-neon-green transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20">
        <div className="relative">
          <Link to={`/producto/${producto.id}`}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(producto);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isFavorite
                ? 'bg-red-500 text-white border-2 border-red-400 shadow-lg'
                : 'bg-dark-bg/80 text-gray-300 border border-gray-600 hover:border-neon-green'
            }`}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="p-4">
          <span className="text-neon-green text-xs font-orbitron uppercase">
            {producto.categoria}
          </span>

          <Link to={`/producto/${producto.id}`}>
            <h3 className="text-white font-orbitron text-lg mt-1 hover:text-neon-green transition-colors">
              {producto.nombre}
            </h3>
          </Link>

          <p className="text-gray-400 text-sm mt-2 line-clamp-2 font-inter">
            {producto.descripcion}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-neon-green font-orbitron text-xl font-bold">
              S/{producto.precio.toFixed(2)}
            </span>

            <button
              onClick={handleAddToCart}
              disabled={producto.stock === 0}
              className={`px-4 py-2 rounded font-bold transition-colors duration-300 font-inter ${
                producto.stock === 0
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-neon-green text-dark-bg hover:bg-neon-green/80'
              }`}
            >
              {producto.stock === 0 ? 'Sin stock' : 'Añadir'}
            </button>
          </div>

          <p className={`text-sm mt-2 font-inter ${producto.stock < 5 ? 'text-red-400' : 'text-gray-400'}`}>
            Stock: {producto.stock}
          </p>
        </div>
      </div>

      <Modal
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
        onConfirm={handleConfirmAdd}
        title="Producto ya en el carrito"
        confirmText="Sí, agregar"
      >
        <p className="text-gray-300 font-inter">
          Este producto ya está en tu carrito. ¿Deseas agregar una unidad más?
        </p>
      </Modal>
    </>
  );
};

export default ProductCard;
