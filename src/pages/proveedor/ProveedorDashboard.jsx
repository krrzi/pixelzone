import React, { useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ProveedoresContext } from '../../context/ProveedoresContext';
import { productos } from '../../data/productos';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const datosOrdenesPorMes = [
  { mes: 'Feb', órdenes: 2 },
  { mes: 'Mar', órdenes: 4 },
  { mes: 'Abr', órdenes: 3 },
  { mes: 'May', órdenes: 5 },
  { mes: 'Jun', órdenes: 4 },
  { mes: 'Jul', órdenes: 3 }
];

const ProveedorDashboard = () => {
  const { usuario } = useAuth();
  const { getProveedorByEmail, ordenesCompra } = useContext(ProveedoresContext);
  const proveedorLogueado = getProveedorByEmail(usuario?.email);

  const ordenesProveedor = proveedorLogueado 
    ? ordenesCompra.filter(o => o.proveedorId === proveedorLogueado.id) 
    : [];

  const ordenesPendientes = ordenesProveedor.filter(o => o.estado === 'Solicitado').length;
  const ordenesEnTransito = ordenesProveedor.filter(o => o.estado === 'En Tránsito').length;
  
  const mesActual = new Date().getMonth() + 1;
  const ordenesCompletadasMes = ordenesProveedor.filter(o => {
    const mesOrden = new Date(o.fechaSolicitud).getMonth() + 1;
    return o.estado === 'Recibido' && mesOrden === mesActual;
  }).length;

  const valorTotalSuministrado = ordenesProveedor
    .filter(o => o.estado === 'Recibido')
    .reduce((sum, o) => sum + o.total, 0);

  const ultimasOrdenes = ordenesProveedor.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        Dashboard Proveedor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Órdenes Pendientes</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-4xl font-bold">{ordenesPendientes}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Órdenes en Tránsito</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-4xl font-bold">{ordenesEnTransito}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Completadas este Mes</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-4xl font-bold">{ordenesCompletadasMes}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Valor Total Suministrado</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">
            S/ {valorTotalSuministrado.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Órdenes por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosOrdenesPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="mes" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Bar dataKey="órdenes" fill="#39ff14" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Últimas Órdenes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#39ff14]/30">
                  <th className="text-gray-400 font-['inter'] py-3 px-4">N° Orden</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Total</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {ultimasOrdenes.map(orden => (
                  <tr key={orden.id} className="border-b border-[#39ff14]/20">
                    <td className="text-white font-['inter'] py-4 px-4">{orden.númeroOrden}</td>
                    <td className="text-[#39ff14] font-['orbitron'] py-4 px-4">
                      S/ {orden.total.toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
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

export default ProveedorDashboard;
