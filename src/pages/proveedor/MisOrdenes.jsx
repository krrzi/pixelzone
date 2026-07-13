import React, { useContext, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ProveedoresContext } from '../../context/ProveedoresContext';
import { productos } from '../../data/productos';

const MisOrdenes = () => {
  const { usuario } = useAuth();
  const { getProveedorByEmail, ordenesCompra, actualizarEstadoOrden } = useContext(ProveedoresContext);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const proveedorLogueado = getProveedorByEmail(usuario?.email);

  const ordenesProveedor = proveedorLogueado 
    ? ordenesCompra.filter(o => o.proveedorId === proveedorLogueado.id) 
    : [];

  const ordenesFiltradas = filtroEstado === 'Todos' 
    ? ordenesProveedor 
    : ordenesProveedor.filter(o => o.estado === filtroEstado);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        Mis Órdenes
      </h1>

      <div className="mb-6">
        <label className="text-gray-400 font-['inter'] mr-4">Filtrar por Estado:</label>
        {['Todos', 'Solicitado', 'En Tránsito', 'Recibido'].map(estado => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            className={`px-4 py-2 rounded mr-3 font-['inter'] ${
              filtroEstado === estado 
                ? 'bg-[#39ff14] text-[#0a0a0a]' 
                : 'bg-transparent border border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14]/10'
            }`}
          >
            {estado}
          </button>
        ))}
      </div>

      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#39ff14]/30">
                <th className="text-gray-400 font-['inter'] py-4 px-6">N° Orden</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Productos</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Total</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Fecha Solicitud</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Fecha Estimada</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Estado</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenesFiltradas.map(orden => (
                <tr key={orden.id} className="border-b border-[#39ff14]/20">
                  <td className="text-white font-['inter'] py-4 px-6">{orden.númeroOrden}</td>
                  <td className="py-4 px-6">
                    <ul className="text-white font-['inter'] text-sm">
                      {orden.productos.map((item, idx) => {
                        const producto = productos.find(p => p.id === item.productoId);
                        return (
                          <li key={idx}>
                            {producto?.nombre} x {item.cantidad} - S/ {item.precioUnitario.toFixed(2)}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td className="text-[#39ff14] font-['orbitron'] py-4 px-6">
                    S/ {orden.total.toFixed(2)}
                  </td>
                  <td className="text-white font-['inter'] py-4 px-6">{orden.fechaSolicitud}</td>
                  <td className="text-white font-['inter'] py-4 px-6">{orden.fechaEstimadaEntrega}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-['inter'] ${
                        orden.estado === 'Solicitado'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : orden.estado === 'En Tránsito'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {orden.estado}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {orden.estado === 'En Tránsito' && (
                      <button
                        onClick={() => actualizarEstadoOrden(orden.id, 'Recibido')}
                        className="bg-green-500 text-[#0a0a0a] px-4 py-2 rounded font-['inter'] hover:bg-green-400"
                      >
                        Confirmar Recepción
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MisOrdenes;
