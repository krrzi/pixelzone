import React, { useState, useContext } from 'react';
import { PedidosContext } from '../../context/PedidosContext';

const PedidosAdmin = () => {
  const { pedidos, actualizarEstadoPedido } = useContext(PedidosContext);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const estados = ['Todos', 'Pendiente', 'En camino', 'Entregado'];

  const pedidosFiltrados = filtroEstado === 'Todos'
    ? pedidos
    : pedidos.filter(p => p.estado === filtroEstado);

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

  const cambiarEstado = (pedidoId, nuevoEstado) => {
    actualizarEstadoPedido(pedidoId, nuevoEstado);
  };

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-neon-green font-orbitron text-4xl font-bold">
            Gestionar Pedidos
          </h1>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="bg-dark-bg border border-neon-green/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-neon-green font-inter"
          >
            {estados.map((estado) => (
              <option key={estado} value={estado} className="bg-dark-bg">
                {estado}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-dark-bg border border-neon-green/30 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neon-green/10">
                <tr>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Pedido</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Cliente</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Productos</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Total</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Fecha</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neon-green/20">
                {pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-neon-green/5">
                    <td className="px-6 py-4">
                      <span className="text-white font-orbitron font-bold">#{pedido.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-inter">{pedido.cliente}</p>
                        <p className="text-gray-400 text-sm font-inter">{pedido.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-inter text-sm">
                      {pedido.productos.map((p, i) => (
                        <div key={i}>{p.cantidad}x {p.nombre}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-neon-green font-orbitron font-bold">
                      S/{pedido.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-inter">
                      {new Date(pedido.fecha).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-orbitron font-bold ${getEstadoColor(pedido.estado)}`}>
                          {pedido.estado}
                        </span>
                        <select
                          value={pedido.estado}
                          onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                          className="bg-dark-bg border border-neon-green/30 text-white px-2 py-1 rounded text-sm font-inter"
                        >
                          {estados.filter(e => e !== 'Todos').map(e => (
                            <option key={e} value={e} className="bg-dark-bg">{e}</option>
                          ))}
                        </select>
                      </div>
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

export default PedidosAdmin;
