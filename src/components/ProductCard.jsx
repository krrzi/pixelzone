import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { WishlistContext } from '../context/WishlistContext';

const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const isFavorite = isInWishlist(producto.id);

  return (
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
            ${producto.precio.toFixed(2)}
          </span>

          <button
            onClick={() => addToCart(producto)}
            className="bg-neon-green text-dark-bg px-4 py-2 rounded font-bold hover:bg-neon-green/80 transition-colors duration-300 font-inter"
          >
            Añadir
          </button>
        </div>

        <p className={`text-sm mt-2 font-inter ${producto.stock < 5 ? 'text-red-400' : 'text-gray-400'}`}>
          Stock: {producto.stock}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
