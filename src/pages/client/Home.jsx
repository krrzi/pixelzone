import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard';

const Home = () => {
  const { productos } = useContext(ProductsContext);
  const categorias = ["Mouse", "Teclado", "Audífonos", "Silla", "Iluminación", "Mando", "RAM", "Almacenamiento", "Monitores gaming", "Webcams", "Micrófonos", "Tarjetas gráficas", "Consolas", "Mandos y Controles"];
  
  // Seleccionar 4 productos aleatorios de distintas categorías
  const productosEnOferta = useMemo(() => {
    const productosCopia = [...productos];
    // Mezclar productos aleatoriamente
    for (let i = productosCopia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [productosCopia[i], productosCopia[j]] = [productosCopia[j], productosCopia[i]];
    }
    return productosCopia.slice(0, 4);
  }, [productos]);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-dark-bg to-dark-bg/80 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-green/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-neon-green font-orbitron text-5xl md:text-7xl font-bold mb-4 animate-pulse">
              PIXEL<span className="text-white">ZONE</span>
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl mb-8 font-inter">
              Los mejores periféricos gaming para tu setup
            </p>
            <Link
              to="/tienda"
              className="inline-block bg-neon-green text-dark-bg px-8 py-4 rounded-lg font-orbitron font-bold text-xl hover:bg-neon-green/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neon-green/50"
            >
              Ver Tienda
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-neon-green font-orbitron text-3xl font-bold text-center mb-12">
            Categorías Destacadas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {categorias.map((categoria) => (
              <Link
                key={categoria}
                to={`/tienda?categoria=${categoria}`}
                className="bg-dark-bg border border-neon-green/30 rounded-lg p-4 text-center hover:border-neon-green hover:bg-neon-green/10 transition-all duration-300 group min-w-0"
              >
                <h3 className="text-white font-orbitron text-base group-hover:text-neon-green transition-colors break-words">
                  {categoria}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos en Oferta */}
      <section className="py-16 px-4 bg-dark-bg/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-neon-green font-orbitron text-3xl font-bold text-center mb-12">
            Productos en Oferta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosEnOferta.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/tienda"
              className="inline-block border-2 border-neon-green text-neon-green px-8 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
