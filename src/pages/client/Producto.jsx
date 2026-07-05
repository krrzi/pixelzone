import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import { useCart } from '../../hooks/useCart';
import { WishlistContext } from '../../context/WishlistContext';

const Producto = () => {
  const { id } = useParams();
  const { productos } = useContext(ProductsContext);
  const producto = productos.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const isFavorite = producto ? isInWishlist(producto.id) : false;

  if (!producto) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-neon-green font-orbitron text-3xl mb-4">Producto no encontrado</h1>
          <Link to="/tienda" className="text-white hover:text-neon-green font-inter">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/tienda" className="text-neon-green hover:underline mb-8 inline-block font-inter">
          ← Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg overflow-hidden relative">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-neon-green text-sm font-orbitron uppercase">
                  {producto.categoria}
                </span>
                <h1 className="text-white font-orbitron text-4xl font-bold mt-2">
                  {producto.nombre}
                </h1>
              </div>
              <button
                onClick={() => toggleWishlist(producto)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-red-500 text-white border-2 border-red-400 shadow-lg' 
                    : 'bg-dark-bg/80 text-gray-300 border border-gray-600 hover:border-neon-green'
                }`}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="text-neon-green font-orbitron text-3xl font-bold">
              S/{producto.precio.toFixed(2)}
            </div>

            <p className="text-gray-300 font-inter leading-relaxed">
              {producto.descripcion}
            </p>

            <div className="space-y-2">
              <p className={`font-inter ${producto.stock < 5 ? 'text-red-400' : 'text-gray-400'}`}>
                Stock disponible: {producto.stock} unidades
              </p>
              {producto.stock < 5 && (
                <p className="text-red-400 text-sm font-inter">
                  ¡Últimas unidades disponibles!
                </p>
              )}
            </div>

            <button
              onClick={() => addToCart(producto)}
              disabled={producto.stock === 0}
              className="w-full bg-neon-green text-dark-bg px-8 py-4 rounded-lg font-orbitron font-bold text-xl hover:bg-neon-green/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {producto.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Producto;
