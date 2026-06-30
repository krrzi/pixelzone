import React from 'react';
import { proveedores } from '../../data/proveedores';

const ProveedoresAdmin = () => {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Entregado':
        return 'text-green-400';
      case 'En camino':
        return 'text-yellow-400';
      case 'Pendiente':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-8">
        Gestionar Proveedores
        </h1>

        <div className="bg-dark-bg border border-neon-green/30 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neon-green/10">
                <tr>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Proveedor</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Contacto</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Productos</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Estado Pedido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neon-green/20">
                {proveedores.map((proveedor) => (
                  <tr key={proveedor.id} className="hover:bg-neon-green/5">
                    <td className="px-6 py-4">
                      <span className="text-white font-orbitron font-bold">{proveedor.nombre}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-inter">
                      {proveedor.contacto}
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-inter">
                      {proveedor.productos.join(', ')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-orbitron font-bold ${getEstadoColor(proveedor.estadoPedido)}`}>
                        {proveedor.estadoPedido}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedoresAdmin;
