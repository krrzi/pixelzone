import React, { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard';

const Tienda = () => {
  const [searchParams] = useSearchParams();
  const categoriaInicial = searchParams.get('categoria');
  const { productos } = useContext(ProductsContext);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaInicial || 'Todos');

  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];

  const productosFiltrados = productos.filter(producto => {
    const coincideCategoria = categoriaSeleccionada === 'Todos' || producto.categoria === categoriaSeleccionada;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neon-green font-orbitron text-4xl font-bold text-center mb-12">
          Nuestra Tienda
        </h1>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
            />
          </div>

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
