import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-neon-green/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-neon-green font-orbitron text-xl font-bold mb-4">
              PIXEL<span className="text-white">ZONE</span>
            </h3>
            <p className="text-gray-400 font-inter">
              Tu tienda de confianza para periféricos gaming de alta calidad.
            </p>
          </div>

          <div>
            <h4 className="text-neon-green font-orbitron font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors font-inter">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors font-inter">
                  Tienda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors font-inter">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-neon-green font-orbitron font-bold mb-4">Contacto</h4>
            <p className="text-gray-400 font-inter">
              contacto@pixelzone.com
            </p>
            <p className="text-gray-400 font-inter">
              +1 234 567 890
            </p>
          </div>
        </div>

        <div className="border-t border-neon-green/30 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-inter">
            &copy; 2026 PixelZone. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
