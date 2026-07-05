import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const redesSociales = [
    { icono: "🐦", nombre: "Twitter", url: "#" },
    { icono: "📘", nombre: "Facebook", url: "#" },
    { icono: "📸", nombre: "Instagram", url: "#" },
    { icono: "🎮", nombre: "Discord", url: "#" }
  ];

  return (
    <footer className="bg-dark-bg border-t border-neon-green/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-neon-green font-orbitron text-xl font-bold mb-4">
              PIXEL<span className="text-white">ZONE</span>
            </h3>
            <p className="text-gray-400 font-inter mb-6">
              Tu tienda de confianza para periféricos gaming de alta calidad.
            </p>
            <div className="flex gap-4">
              {redesSociales.map((red, index) => (
                <a
                  key={index}
                  href={red.url}
                  className="text-gray-400 hover:text-neon-green transition-colors text-2xl"
                >
                  {red.icono}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-neon-green font-orbitron font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-neon-green transition-colors font-inter">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/tienda" className="text-gray-400 hover:text-neon-green transition-colors font-inter">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/armar-setup" className="text-gray-400 hover:text-neon-green transition-colors font-inter">
                  Arma tu Setup
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-neon-green font-orbitron font-bold mb-4">Ayuda</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors font-inter">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors font-inter">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors font-inter">
                  Garantía
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-neon-green font-orbitron font-bold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 font-inter flex items-center gap-2">
                📧 contacto@pixelzone.com
              </li>
              <li className="text-gray-400 font-inter flex items-center gap-2">
                📞 +1 234 567 890
              </li>
              <li className="text-gray-400 font-inter flex items-center gap-2">
                📍 Calle Gaming 123, Ciudad Tech
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-green/30 mt-12 pt-8 text-center">
          <p className="text-gray-400 font-inter">
            &copy; 2026 PixelZone. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
