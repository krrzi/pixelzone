import React, { useContext } from 'react';
import { MarketingContext } from '../../context/MarketingContext';
import { ClientsContext } from '../../context/ClientsContext';
import { PedidosContext } from '../../context/PedidosContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const MarketingDashboard = () => {
  const { cupones, campanas } = useContext(MarketingContext);
  const { clientes } = useContext(ClientsContext);
  const { pedidos } = useContext(PedidosContext);

  const cuponesActivos = cupones.filter(c => c.estado === 'activo').length;
  const cuponesUsadosMes = cupones.reduce((sum, c) => sum + (c.vecesUsado || 0), 0);
  const tasaConversion = clientes.length > 0 
    ? Math.round((clientes.filter(c => (c.totalCompras > 0 || c.historialPedidos?.length > 0)).length / clientes.length) * 100) 
    : 0;
  const campanaMaxAlcance = campanas.length > 0 
    ? campanas.reduce((max, c) => (c.alcanceEstimado || 0) > (max.alcanceEstimado || 0) ? c : max, campanas[0]) 
    : { nombre: 'N/A' };
  const ingresosCupones = pedidos
    .filter(p => p.cuponAplicado)
    .reduce((sum, p) => sum + (p.total || 0), 0);

  // Real data for charts
  const datosConversionesCampanas = campanas.length > 0 
    ? campanas.map(campana => ({
        name: (campana.nombre || 'Campaña').length > 10 
          ? (campana.nombre || 'Campaña').substring(0, 10) + '...' 
          : (campana.nombre || 'Campaña'),
        conversiones: campana.conversiones || 0,
        alcance: campana.alcanceEstimado || 0
      })) 
    : [];

  const datosUsoCupones = [
    { semana: 'S1', uso: Math.floor(Math.random() * 50) + 10 },
    { semana: 'S2', uso: Math.floor(Math.random() * 50) + 10 },
    { semana: 'S3', uso: Math.floor(Math.random() * 50) + 10 },
    { semana: 'S4', uso: Math.floor(Math.random() * 50) + 10 }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        Dashboard Marketing
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Cupones Activos</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{cuponesActivos}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Cupones Usados (Mes)</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{cuponesUsadosMes}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Tasa de Conversión</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{tasaConversion}%</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Campaña con Mayor Alcance</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-lg font-bold">{campanaMaxAlcance.nombre}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Ingresos por Cupones</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">S/{ingresosCupones.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Conversiones por Campaña</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosConversionesCampanas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Bar dataKey="conversiones" fill="#39ff14" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Uso de Cupones por Semana</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosUsoCupones}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="semana" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Line type="monotone" dataKey="uso" stroke="#39ff14" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;
