
import React, { useContext } from 'react';
import { LogisticaContext } from '../../context/LogisticaContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const LogisticaDashboard = () => {
  const { envios, couriers } = useContext(LogisticaContext);

  // Calculate KPIs
  const enviosTotales = envios.length;
  const enviosEnCamino = envios.filter(e => e.estado === 'En camino').length;
  const entregadosEsteMes = envios.filter(e => e.estado === 'Entregado' && e.fechaEntregaReal?.startsWith('2026-06')).length;
  
  const entregasATiempo = envios.filter(e => 
    e.estado === 'Entregado' && 
    e.fechaEntregaReal && 
    e.fechaEstimada &&
    new Date(e.fechaEntregaReal) <= new Date(e.fechaEstimada)
  ).length;
  
  const porcentajeATiempo = enviosTotales > 0 ? Math.round((entregasATiempo / enviosTotales) * 100) : 0;
  
  const courierMasEntregas = couriers.reduce((max, c) => c.entregasCompletadas > max.entregasCompletadas ? c : max, couriers[0] || { nombre: 'N/A' });

  // Chart data
  const datosEnviosPorEstado = [
    { name: 'Pendiente', value: envios.filter(e => e.estado === 'Pendiente').length },
    { name: 'Preparación', value: envios.filter(e => e.estado === 'En preparación').length },
    { name: 'En camino', value: envios.filter(e => e.estado === 'En camino').length },
    { name: 'Entregado', value: envios.filter(e => e.estado === 'Entregado').length },
    { name: 'Incidencia', value: envios.filter(e => e.estado === 'Incidencia' || e.estado === 'Devuelto').length }
  ];

  const datosEntregasPorSemana = [
    { semana: 'Semana 1', entregas: Math.floor(Math.random() * 20 + 10) },
    { semana: 'Semana 2', entregas: Math.floor(Math.random() * 20 + 10) },
    { semana: 'Semana 3', entregas: Math.floor(Math.random() * 20 + 10) },
    { semana: 'Semana 4', entregas: entregadosEsteMes }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        Dashboard Logística
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Envíos Totales</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{enviosTotales}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Envíos en Camino</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{enviosEnCamino}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Entregados Este Mes</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{entregadosEsteMes}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Entregas a Tiempo</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{porcentajeATiempo}%</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Courier con Más Entregas</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-lg font-bold">{courierMasEntregas.nombre}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Envíos por Estado</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosEnviosPorEstado}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Bar dataKey="value" fill="#39ff14" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Entregas por Semana</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosEntregasPorSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="semana" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Line type="monotone" dataKey="entregas" stroke="#39ff14" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LogisticaDashboard;
