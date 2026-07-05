import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import { useCart } from '../../hooks/useCart';

const ArmarSetup = () => {
  const { productos } = useContext(ProductsContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Available categories (based on existing products)
  const CATEGORIES = ['Mouse', 'Teclado', 'Audífonos', 'Silla', 'Iluminación', 'Mando', 'RAM', 'Almacenamiento', 'Monitores gaming', 'Webcams', 'Micrófonos', 'Tarjetas gráficas', 'Consolas', 'Mandos y Controles'];

  // State
  const [presupuesto, setPresupuesto] = useState(500);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(['Mouse', 'Teclado', 'Audífonos']);
  const [setupRecomendado, setSetupRecomendado] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);
  const [variacion, setVariacion] = useState(0);

  // Helper to get products by category
  const getProductosPorCategoria = (categoria) => {
    return productos.filter(p => p.categoria === categoria && p.stock > 0);
  };

  // Toggle category selection
  const toggleCategoria = (categoria) => {
    setCategoriasSeleccionadas(prev => 
      prev.includes(categoria) 
        ? prev.filter(c => c !== categoria) 
        : [...prev, categoria]
    );
    setSetupRecomendado(null);
    setMensajeError(null);
  };

  // Generate the setup recommendation
  const generarSetup = () => {
    setMensajeError(null);

    if (categoriasSeleccionadas.length === 0) {
      setMensajeError('Por favor selecciona al menos una categoría');
      return;
    }

    // For each selected category, get products sorted by price
    const productosPorCategoria = {};
    let valid = true;

    categoriasSeleccionadas.forEach(cat => {
      const prods = getProductosPorCategoria(cat);
      if (prods.length === 0) {
        setMensajeError(`No hay productos disponibles para la categoría ${cat}`);
        valid = false;
      }
      productosPorCategoria[cat] = prods.sort((a, b) => a.precio - b.precio);
    });

    if (!valid) return;

    // Try to find a combination that fits within budget
    // Start with the cheapest option for each, then try variations
    const combinacion = {};
    let total = 0;
    let excedido = false;

    // First pass: try cheapest options
    categoriasSeleccionadas.forEach(cat => {
      const prods = productosPorCategoria[cat];
      const index = variacion % prods.length;
      const prod = prods[index];
      combinacion[cat] = prod;
      total += prod.precio;
    });

    if (total > presupuesto) {
      excedido = true;
    }

    if (excedido) {
      setMensajeError(`El presupuesto S/{presupuesto.toFixed(2)} es insuficiente para un setup con estas categorías. Intenta quitar una categoría o aumentar el presupuesto.`);
      setSetupRecomendado(null);
      return;
    }

    setSetupRecomendado({
      productos: combinacion,
      total: total
    });
  };

  // Add all products to cart
  const agregarTodoAlCarrito = () => {
    if (!setupRecomendado) return;
    Object.values(setupRecomendado.productos).forEach(prod => {
      addToCart(prod);
    });
    navigate('/carrito');
  };

  // Generate another combination
  const generarOtraCombinacion = () => {
    setVariacion(v => v + 1);
    generarSetup();
  };

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-3">
            🎮 Arma tu Setup Ideal
          </h1>
          <p className="text-gray-400 font-inter">
            Recomendado por nuestro asistente de compra PixelZone
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-8 mb-8">
          <h2 className="text-white font-orbitron text-xl font-bold mb-6">
            Configura tu Presupuesto y Categorías
          </h2>

          {/* Budget Slider */}
          <div className="mb-8">
            <label className="block text-gray-300 font-inter mb-3">
              Presupuesto: S/{presupuesto.toFixed(2)}
            </label>
            <input
              type="range"
              min="100"
              max="10000"
              step="50"
              value={presupuesto}
              onChange={(e) => {
                setPresupuesto(Number(e.target.value));
                setSetupRecomendado(null);
                setMensajeError(null);
              }}
              className="w-full accent-neon-green"
            />
            <div className="flex justify-between text-gray-500 text-sm font-inter mt-2">
              <span>S/100</span>
              <span>S/5000</span>
              <span>S/10000</span>
            </div>
          </div>

          {/* Categories Checkboxes */}
          <div className="mb-8">
            <label className="block text-gray-300 font-inter mb-4">
              Categorías a incluir:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categoriasSeleccionadas.includes(cat)}
                    onChange={() => toggleCategoria(cat)}
                    className="accent-neon-green w-5 h-5"
                  />
                  <span className="text-white font-inter">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generarSetup}
            className="w-full bg-neon-green text-dark-bg px-8 py-4 rounded-lg font-orbitron font-bold text-xl hover:bg-neon-green/80 transition-all duration-300"
          >
            🚀 Generar mi Setup
          </button>

          {mensajeError && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-400 font-inter">{mensajeError}</p>
            </div>
          )}
        </div>

        {/* Recommendation Result */}
        {setupRecomendado && (
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-neon-green font-orbitron text-2xl font-bold">
                ⚡ Setup Recomendado
              </h2>
              <div className="text-right">
                <p className="text-gray-400 font-inter text-sm">Total</p>
                <p className="text-white font-orbitron text-3xl font-bold">
                  S/{setupRecomendado.total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {Object.entries(setupRecomendado.productos).map(([cat, prod]) => (
                <div
                  key={cat}
                  className="border border-neon-green/20 rounded-lg p-4"
                >
                  <p className="text-neon-green font-orbitron text-sm mb-2">{cat}</p>
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <p className="text-white font-inter font-bold truncate mb-2">{prod.nombre}</p>
                  <p className="text-neon-green font-orbitron font-bold">
                    S/{prod.precio.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={agregarTodoAlCarrito}
                className="flex-1 bg-neon-green text-dark-bg px-8 py-4 rounded-lg font-orbitron font-bold hover:bg-neon-green/80 transition-all duration-300"
              >
                🛒 Agregar todo al carrito
              </button>
              <button
                onClick={generarOtraCombinacion}
                className="flex-1 border border-neon-green text-neon-green px-8 py-4 rounded-lg font-orbitron font-bold hover:bg-neon-green/10 transition-all duration-300"
              >
                🔄 Generar otra combinación
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArmarSetup;
