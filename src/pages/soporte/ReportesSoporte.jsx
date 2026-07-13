
import React, { useContext } from 'react';
import { SoporteContext } from '../../context/SoporteContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ReportesSoporte = () => {
  const { tickets } = useContext(SoporteContext);

  const datosResueltosPorMes = () => {
    return [
      { mes: 'Ene', resueltos: Math.floor(Math.random() * 30 + 10) },
      { mes: 'Feb', resueltos: Math.floor(Math.random() * 30 + 10) },
      { mes: 'Mar', resueltos: Math.floor(Math.random() * 30 + 10) },
      { mes: 'Abr', resueltos: Math.floor(Math.random() * 30 + 10) },
      { mes: 'May', resueltos: Math.floor(Math.random() * 30 + 10) },
      { mes: 'Jun', resueltos: tickets.filter(t => t.estado === 'Cerrado' || t.estado === 'Resuelto').length }
    ];
  };

  const datosTicketsPorMotivoYPrioridad = () => {
    const motivos = ['Demora en entrega', 'Producto dañado', 'No llegó el pedido', 'Solicitud de reembolso', 'Consulta general', 'Problema con cupón'];
    return motivos.map(motivo => ({
      motivo,
      alta: tickets.filter(t => t.motivo === motivo && t.prioridad === 'Alta').length,
      media: tickets.filter(t => t.motivo === motivo && t.prioridad === 'Media').length,
      baja: tickets.filter(t => t.motivo === motivo && t.prioridad === 'Baja').length
    }));
  };

  const ticketsPeoresCalificaciones = () => {
    return tickets.filter(t => t.calificacionCliente && t.calificacionCliente <= 3)
      .sort((a, b) => a.calificacionCliente - b.calificacionCliente)
      .slice(0, 10);
  };

  const tiempoPromedioPorMotivo = () => {
    const motivos = ['Demora en entrega', 'Producto dañado', 'No llegó el pedido', 'Solicitud de reembolso', 'Consulta general', 'Problema con cupón'];
    return motivos.map(motivo => {
      const ticketsMotivo = tickets.filter(t => t.motivo === motivo && t.fechaCierre);
      if (ticketsMotivo.length === 0) return { motivo, promedioHoras: 0 };
      const totalHoras = ticketsMotivo.reduce((sum, t) => {
        const diff = (new Date(t.fechaCierre) - new Date(t.fechaCreacion)) / (1000 * 60 * 60);
        return sum + diff;
      }, 0);
      return { motivo, promedioHoras: (totalHoras / ticketsMotivo.length).toFixed(1) };
    });
  };

  const exportarCSV = () => {
    const encabezados = ['ID Ticket', 'Cliente', 'Asunto', 'Motivo', 'Estado', 'Prioridad', 'Fecha Creación', 'Fecha Cierre', 'Calificación', 'Mensajes'];
    const filas = tickets.map(ticket => [
      ticket.id,
      ticket.clienteNombre,
      ticket.asunto,
      ticket.motivo,
      ticket.estado,
      ticket.prioridad,
      ticket.fechaCreacion,
      ticket.fechaCierre,
      ticket.calificacionCliente || '',
      ticket.mensajes.map(m => `${m.autor}: ${m.texto}`).join(' | ')
    ]);

    const contenido = [encabezados.join(','), ...filas.map(f => f.join(','))].join('\n');
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reportes_soporte.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">Reportes Soporte</h1>
        <button
          onClick={exportarCSV}
          className="bg-[#39ff14] text-[#0a0a0a] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
        >
          Exportar CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Tickets Resueltos por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosResueltosPorMes()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="mes" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Line type="monotone" dataKey="resueltos" stroke="#39ff14" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Tickets por Motivo y Prioridad</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosTicketsPorMotivoYPrioridad()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="motivo" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Legend wrapperStyle={{ color: 'white' }} />
              <Bar dataKey="alta" fill="#ef4444" />
              <Bar dataKey="media" fill="#eab308" />
              <Bar dataKey="baja" fill="#6b7280" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Tickets con Peores Calificaciones</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#39ff14]/30">
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Ticket</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Cliente</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Calificación</th>
                </tr>
              </thead>
              <tbody>
                {ticketsPeoresCalificaciones().map(ticket => (
                  <tr key={ticket.id} className="border-b border-[#39ff14]/20">
                    <td className="text-white font-['inter'] py-3 px-4">{ticket.asunto}</td>
                    <td className="text-white font-['inter'] py-3 px-4">{ticket.clienteNombre}</td>
                    <td className="text-red-400 font-['orbitron'] py-3 px-4">{ticket.calificacionCliente} ★</td>
                  </tr>
                ))}
                {ticketsPeoresCalificaciones().length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-400 font-['inter']">
                      No hay tickets con calificaciones bajas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Tiempo Promedio de Resolución por Motivo</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#39ff14]/30">
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Motivo</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Tiempo Promedio (hrs)</th>
                </tr>
              </thead>
              <tbody>
                {tiempoPromedioPorMotivo().map(item => (
                  <tr key={item.motivo} className="border-b border-[#39ff14]/20">
                    <td className="text-white font-['inter'] py-3 px-4">{item.motivo}</td>
                    <td className="text-[#39ff14] font-['orbitron'] py-3 px-4">{item.promedioHoras}</td>
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

export default ReportesSoporte;
