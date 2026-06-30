import React, { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';

const InventarioAdmin = () => {
  const { productos } = useContext(ProductsContext);
  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-8">
          Control de Inventario
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
            <h3 className="text-gray-400 font-inter text-sm mb-2">Productos con Bajo Stock</h3>
            <p className="text-red-400 font-orbitron text-3xl font-bold">
              {productos.filter(p => p.stock < 5).length}
            </p>
          </div>
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
            <h3 className="text-gray-400 font-inter text-sm mb-2">Total en Stock</h3>
            <p className="text-neon-green font-orbitron text-3xl font-bold">
              {productos.reduce((total, p) => total + p.stock, 0)}
            </p>
          </div>
        </div>

        <div className="bg-dark-bg border border-neon-green/30 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neon-green/10">
                <tr>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Producto</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Categoría</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Stock</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neon-green/20">
                {productos.map((producto) => {
                  const getEstado = () => {
                    if (producto.stock === 0) return { texto: 'Agotado', color: 'text-red-400' };
                    if (producto.stock < 5) return { texto: 'Bajo Stock', color: 'text-yellow-400' };
                    return { texto: 'Disponible', color: 'text-green-400' };
                  };

                  const estado = getEstado();

                  return (
                    <tr key={producto.id} className="hover:bg-neon-green/5">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-12 h-12 object-cover rounded mr-4"
                          />
                          <span className="text-white font-inter">{producto.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300 font-inter">
                        {producto.categoria}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-orbitron font-bold ${estado.color}`}>
                          {producto.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-orbitron font-bold ${estado.color}`}>
                          {estado.texto}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventarioAdmin;
