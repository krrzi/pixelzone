
import React, { useContext } from 'react';
import { SoporteContext } from '../../context/SoporteContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const SoporteDashboard = () => {
  const { tickets } = useContext(SoporteContext);

  // KPIs
  const ticketsAbiertos = tickets.filter(t => t.estado === 'Abierto').length;
  const ticketsEnProceso = tickets.filter(t => t.estado === 'En proceso').length;
  const ticketsCerrados = tickets.filter(t => t.estado === 'Cerrado' || t.estado === 'Resuelto');

  const calcularTiempoPromedioResolucion = () => {
    const ticketsResueltos = tickets.filter(t => t.fechaCierre);
    if (ticketsResueltos.length === 0) return 0;
    const totalHoras = ticketsResueltos.reduce((sum, t) => {
      const fechaCreacion = new Date(t.fechaCreacion);
      const fechaCierre = new Date(t.fechaCierre);
      const diferenciaHoras = (fechaCierre - fechaCreacion) / (1000 * 60 * 60);
      return sum + diferenciaHoras;
    }, 0);
    return (totalHoras / ticketsResueltos.length).toFixed(1);
  };

  const calificacionPromedio = () => {
    const ticketsCalificados = tickets.filter(t => t.calificacionCliente);
    if (ticketsCalificados.length === 0) return 0;
    const promedio = ticketsCalificados.reduce((sum, t) => sum + t.calificacionCliente, 0) / ticketsCalificados.length;
    return promedio.toFixed(1);
  };

  const motivoMasComun = () => {
    const conteo = {};
    tickets.forEach(t => {
      if (!conteo[t.motivo]) conteo[t.motivo] = 0;
      conteo[t.motivo]++;
    });
    return Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b, '');
  };

  const datosTicketsPorMotivo = () => {
    const conteo = {};
    tickets.forEach(t => {
      if (!conteo[t.motivo]) conteo[t.motivo] = 0;
      conteo[t.motivo]++;
    });
    return Object.keys(conteo).map(motivo => ({ motivo, total: conteo[motivo] }));
  };

  const datosTicketsPorSemana = () => {
    return [
      { semana: 'Semana 1', creados: Math.floor(Math.random() * 20 + 5), resueltos: Math.floor(Math.random() * 15 + 5) },
      { semana: 'Semana 2', creados: Math.floor(Math.random() * 20 + 5), resueltos: Math.floor(Math.random() * 15 + 5) },
      { semana: 'Semana 3', creados: Math.floor(Math.random() * 20 + 5), resueltos: Math.floor(Math.random() * 15 + 5) },
      { semana: 'Semana 4', creados: ticketsCerrados.length, resueltos: ticketsCerrados.length }
    ];
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        Dashboard Soporte
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Tickets Abiertos</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{ticketsAbiertos}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Tickets en Proceso</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{ticketsEnProceso}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Tiempo Prom. Resolución (hrs)</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{calcularTiempoPromedioResolucion()}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Calificación Promedio</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{calificacionPromedio()}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Motivo Más Común</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-lg font-bold">{motivoMasComun()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Tickets por Motivo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosTicketsPorMotivo()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="motivo" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Bar dataKey="total" fill="#39ff14" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Tickets Creados vs Resueltos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosTicketsPorSemana()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="semana" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Legend wrapperStyle={{ color: 'white' }} />
              <Line type="monotone" dataKey="creados" stroke="#39ff14" strokeWidth={2} />
              <Line type="monotone" dataKey="resueltos" stroke="#00bcd4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SoporteDashboard;
