import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard';

const Home = () => {
  const { productos } = useContext(ProductsContext);
  const categorias = ["Mouse", "Teclado", "Audífonos", "Silla", "Iluminación", "Mando", "RAM", "Almacenamiento", "Monitores gaming", "Webcams", "Micrófonos", "Tarjetas gráficas", "Consolas", "Mandos y Controles"];

  // Seleccionar 4 productos con mayor stock como más vendidos
  const productosMasVendidos = useMemo(() => {
    return [...productos].sort((a, b) => b.stock - a.stock).slice(0, 4);
  }, [productos]);

  const beneficios = [
    {
      icono: "🚚",
      titulo: "Envío rápido",
      descripcion: "Entrega en 24-48 horas para pedidos dentro de la ciudad"
    },
    {
      icono: "💻",
      titulo: "Asesoría personalizada",
      descripcion: "Te ayudamos a encontrar el setup perfecto para ti"
    },
    {
      icono: "✅",
      titulo: "Garantía de calidad",
      descripcion: "Todos los productos con garantía oficial de 1 año"
    },
    {
      icono: "24/7",
      titulo: "Soporte 24/7",
      descripcion: "Atención al cliente disponible todo el día, todos los días"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-dark-bg/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-green/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-neon-green font-orbitron text-5xl md:text-7xl font-bold mb-6">
              Tu Setup. Tu<span className="text-white"> Dominio.</span>
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl mb-10 font-inter max-w-2xl mx-auto">
              Equipamiento gaming de alta calidad para llevar tu juego al siguiente nivel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tienda"
                className="inline-block bg-neon-green text-dark-bg px-8 py-4 rounded-lg font-orbitron font-bold text-xl hover:bg-neon-green/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neon-green/50"
              >
                Ver Tienda
              </Link>
              <Link
                to="/armar-setup"
                className="inline-block border-2 border-neon-green text-neon-green px-8 py-4 rounded-lg font-orbitron font-bold text-xl hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
              >
                Arma tu Setup
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué PixelZone */}
      <section className="py-16 px-4 bg-dark-bg/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-neon-green font-orbitron text-3xl font-bold text-center mb-12">
            ¿Por qué PixelZone?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className="bg-dark-bg border border-neon-green/30 rounded-lg p-8 text-center hover:border-neon-green hover:bg-neon-green/10 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{beneficio.icono}</div>
                <h3 className="text-white font-orbitron text-xl font-bold mb-2">{beneficio.titulo}</h3>
                <p className="text-gray-400 font-inter">{beneficio.descripcion}</p>
              </div>
            ))}
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

      {/* Más vendidos */}
      <section className="py-16 px-4 bg-dark-bg/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-neon-green font-orbitron text-3xl font-bold text-center mb-12">
            Más Vendidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosMasVendidos.map((producto) => (
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

      {/* Sobre nosotros */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-neon-green font-orbitron text-3xl font-bold mb-8">
            Sobre Nosotros
          </h2>
          <p className="text-gray-300 font-inter text-lg leading-relaxed mb-4">
            En PixelZone, somos apasionados del gaming y entendemos la importancia de un equipamiento de calidad.
          </p>
          <p className="text-gray-300 font-inter text-lg leading-relaxed">
            Nuestra misión es ayudarte a encontrar los componentes y periféricos perfectos para que puedas construir el setup de tus sueños, con el mejor rendimiento y estilo.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
