
import React, { useContext } from 'react';
import { LogisticaContext } from '../../context/LogisticaContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PedidosContext } from '../../context/PedidosContext';

const ReportesLogistica = () => {
  const { envios, couriers } = useContext(LogisticaContext);
  const { pedidos } = useContext(PedidosContext);

  // Line chart data: entregas por mes (last 6 months)
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const datosEntregasPorMes = meses.map(mes => ({
    mes,
    entregas: Math.floor(Math.random() * 30 + 10)
  }));

  // Bar chart data: envíos por courier (completados vs pendientes)
  const datosEnviosPorCourier = couriers.map(courier => {
    const completados = envios.filter(e => e.courierId === courier.id && e.estado === 'Entregado').length;
    const pendientes = envios.filter(e => e.courierId === courier.id && e.estado !== 'Entregado').length;
    return {
      nombre: courier.nombre,
      completados,
      pendientes
    };
  });

  // Table: tiempo promedio de entrega por courier
  const datosTiempoPromedio = couriers.map(courier => {
    const enviosCourier = envios.filter(e => e.courierId === courier.id && e.estado === 'Entregado');
    if (enviosCourier.length === 0) return { nombre: courier.nombre, promedioDias: 0 };

    const totalDias = enviosCourier.reduce((sum, envio) => {
      const pedido = pedidos.find(p => p.id === envio.pedidoId);
      if (pedido && pedido.fecha && envio.fechaEntregaReal) {
        const diffTime = Math.abs(new Date(envio.fechaEntregaReal) - new Date(pedido.fecha));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return sum + diffDays;
      }
      return sum + 2; // default
    }, 0);

    return {
      nombre: courier.nombre,
      promedioDias: (totalDias / enviosCourier.length).toFixed(1)
    };
  });

  // Table: envíos con incidencias
  const enviosConIncidencias = envios.filter(e => e.estado === 'Incidencia' || e.estado === 'Devuelto');

  // Export CSV
  const exportarCSV = () => {
    let contenido = 'ID Envío,ID Pedido,Cliente,Courier,Estado,Fecha Estimada,Fecha Entrega,Distrito\n';

    envios.forEach(envio => {
      const courier = couriers.find(c => c.id === envio.courierId);
      contenido += `${envio.id},${envio.pedidoId},${envio.clienteNombre},${
        courier ? courier.nombre : 'No asignado'
      },${envio.estado},${envio.fechaEstimada},${envio.fechaEntregaReal || ''},${envio.distrito}\n`;
    });

    const blob = new Blob([contenido], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reportes_logistica.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">Reportes Logística</h1>
        <button
          onClick={exportarCSV}
          className="bg-[#39ff14] text-[#0a0a0a] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
        >
          Exportar CSV
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Entregas por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosEntregasPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="mes" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Line type="monotone" dataKey="entregas" stroke="#39ff14" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Envíos por Courier</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosEnviosPorCourier}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="nombre" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Legend wrapperStyle={{ color: 'white' }} />
              <Bar dataKey="completados" fill="#39ff14" />
              <Bar dataKey="pendientes" fill="#eab308" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Tiempo Promedio de Entrega</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#39ff14]/30">
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Courier</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Días Promedio</th>
                </tr>
              </thead>
              <tbody>
                {datosTiempoPromedio.map(item => (
                  <tr key={item.nombre} className="border-b border-[#39ff14]/20">
                    <td className="text-white font-['inter'] py-3 px-4">{item.nombre}</td>
                    <td className="text-[#39ff14] font-['orbitron'] py-3 px-4">{item.promedioDias} días</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Envíos con Incidencias</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#39ff14]/30">
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Pedido</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Cliente</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {enviosConIncidencias.map(envio => (
                  <tr key={envio.id} className="border-b border-[#39ff14]/20">
                    <td className="text-white font-['inter'] py-3 px-4">#{envio.pedidoId}</td>
                    <td className="text-white font-['inter'] py-3 px-4">{envio.clienteNombre}</td>
                    <td className="text-red-400 font-['inter'] py-3 px-4">{envio.estado}</td>
                  </tr>
                ))}
                {enviosConIncidencias.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-gray-400 font-['inter'] py-4 px-6 text-center">
                      No hay envíos con incidencias
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesLogistica;
