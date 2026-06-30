import React, { useState, useContext } from 'react';
import { ClientsContext } from '../../context/ClientsContext';
import { pedidos } from '../../data/pedidos';

const ClientesAdmin = () => {
  const { clientes, getPedidosPorCliente } = useContext(ClientsContext);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const getTipoCliente = (totalCompras) => {
    if (totalCompras >= 3) return { texto: 'Cliente frecuente', color: 'text-green-400', bg: 'bg-green-400/20' };
    if (totalCompras <= 1) return { texto: 'Cliente nuevo', color: 'text-blue-400', bg: 'bg-blue-400/20' };
    return { texto: 'Cliente regular', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
  };

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-8">
          CRM - Clientes
        </h1>

        {/* Tabla de Clientes */}
        <div className="bg-dark-bg border border-neon-green/30 rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neon-green/10">
                <tr>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Nombre</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Email</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Fecha de Registro</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Total Compras</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Tipo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neon-green/20">
                {clientes.map((cliente) => {
                  const tipo = getTipoCliente(cliente.totalCompras);
                  return (
                    <tr 
                      key={cliente.id} 
                      className="hover:bg-neon-green/5 cursor-pointer"
                      onClick={() => setClienteSeleccionado(cliente)}
                    >
                      <td className="px-6 py-4">
                        <span className="text-white font-inter">{cliente.nombre}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 font-inter">
                        {cliente.email}
                      </td>
                      <td className="px-6 py-4 text-gray-300 font-inter">
                        {new Date(cliente.fechaRegistro).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-neon-green font-orbitron font-bold">
                        {cliente.totalCompras}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-inter font-bold px-3 py-1 rounded ${tipo.color} ${tipo.bg}`}>
                          {tipo.texto}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Historial */}
        {clienteSeleccionado && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-bg border border-neon-green/30 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-neon-green font-orbitron text-2xl font-bold">
                    Historial de {clienteSeleccionado.nombre}
                  </h2>
                  <button
                    onClick={() => setClienteSeleccionado(null)}
                    className="text-white hover:text-neon-green font-inter text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  {getPedidosPorCliente(clienteSeleccionado.email).map((pedido) => (
                    <div key={pedido.id} className="border border-neon-green/20 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-white font-orbitron font-bold">Pedido #{pedido.id}</p>
                          <p className="text-gray-400 font-inter text-sm">
                            {new Date(pedido.fecha).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-neon-green font-orbitron font-bold text-xl">
                          ${pedido.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t border-neon-green/20 pt-3">
                        <p className="text-gray-300 font-inter mb-2">Productos:</p>
                        {pedido.productos.map((producto, idx) => (
                          <p key={idx} className="text-gray-400 font-inter text-sm">
                            {producto.cantidad}x {producto.nombre}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientesAdmin;
