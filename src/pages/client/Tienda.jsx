import React, { useState, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard';

const Tienda = () => {
  const [searchParams] = useSearchParams();
  const categoriaInicial = searchParams.get('categoria');
  const { productos } = useContext(ProductsContext);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaInicial || 'Todos');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState('nombre-asc');

  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];

  const productosFiltrados = useMemo(() => {
    let result = [...productos];

    // Filtro por categoría
    if (categoriaSeleccionada !== 'Todos') {
      result = result.filter(p => p.categoria === categoriaSeleccionada);
    }

    // Filtro por búsqueda
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      result = result.filter(
        p => p.nombre.toLowerCase().includes(busquedaLower) ||
             p.descripcion.toLowerCase().includes(busquedaLower)
      );
    }

    // Filtro por precio
    if (precioMin) {
      result = result.filter(p => p.precio >= Number(precioMin));
    }
    if (precioMax) {
      result = result.filter(p => p.precio <= Number(precioMax));
    }

    // Filtro por disponibilidad
    if (soloDisponibles) {
      result = result.filter(p => p.stock > 0);
    }

    // Ordenar
    switch (ordenarPor) {
      case 'precio-asc':
        result.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        result.sort((a, b) => b.precio - a.precio);
        break;
      case 'nombre-asc':
        result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombre-desc':
        result.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      default:
        break;
    }

    return result;
  }, [productos, categoriaSeleccionada, busqueda, precioMin, precioMax, soloDisponibles, ordenarPor]);

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaSeleccionada('Todos');
    setPrecioMin('');
    setPrecioMax('');
    setSoloDisponibles(false);
    setOrdenarPor('nombre-asc');
  };

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neon-green font-orbitron text-4xl font-bold text-center mb-12">
          Nuestra Tienda
        </h1>

        {/* Filtros */}
        <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Búsqueda */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
              />
            </div>

            {/* Categoría */}
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
            >
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria} className="bg-dark-bg">
                  {categoria}
                </option>
              ))}
            </select>

            {/* Ordenar */}
            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value)}
              className="bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
            >
              <option value="nombre-asc">Ordenar: Nombre A-Z</option>
              <option value="nombre-desc">Ordenar: Nombre Z-A</option>
              <option value="precio-asc">Ordenar: Precio menor a mayor</option>
              <option value="precio-desc">Ordenar: Precio mayor a menor</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Rango de precio */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Precio min ($)"
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
                className="flex-1 bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
              />
              <input
                type="number"
                placeholder="Precio max ($)"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
                className="flex-1 bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
              />
            </div>

            {/* Solo disponibles */}
            <label className="flex items-center gap-2 cursor-pointer text-white font-inter">
              <input
                type="checkbox"
                checked={soloDisponibles}
                onChange={(e) => setSoloDisponibles(e.target.checked)}
                className="accent-neon-green w-5 h-5"
              />
              Solo productos disponibles
            </label>

            {/* Limpiar filtros */}
            <button
              onClick={limpiarFiltros}
              className="text-neon-green hover:text-white font-inter text-right"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* Resultados */}
        {productosFiltrados.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 font-inter text-xl">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6 font-inter">
              Mostrando {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productosFiltrados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tienda;
