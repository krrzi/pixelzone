
import React, { useContext } from 'react';
import { MarketingContext } from '../../context/MarketingContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ReportesMarketing = () => {
  const { cupones, campanas } = useContext(MarketingContext);

  // Datos para el gráfico de uso de cupones por mes (últimos 6 meses)
  const obtenerDatosUsoCupones = () => {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    const datos = meses.map(mes => ({
      mes,
      uso: Math.floor(Math.random() * 100) + 20
    }));
    return datos;
  };

  // Datos para el gráfico de rendimiento de campañas
  const obtenerDatosRendimientoCampanas = () => {
    return campanas.map(campana => ({
      nombre: campana.nombre.length > 10 ? campana.nombre.substring(0, 10) + '...' : campana.nombre,
      conversiones: campana.conversiones,
      alcance: campana.alcanceEstimado
    }));
  };

  // Cupones más usados
  const cuponesMasUsados = [...cupones].sort((a, b) => b.vecesUsado - a.vecesUsado);

  // Campañas por ROI (simulado)
  const campanasPorROI = [...campanas].map(campana => {
    const roi = campana.presupuesto > 0 ? (campana.conversiones / campana.presupuesto) * 100 : 0;
    return { ...campana, roi };
  }).sort((a, b) => b.roi - a.roi);

  // Exportar CSV
  const exportarCSV = () => {
    let contenido = 'Tipo,ID,Nombre/Code,Valor/Conversiones\n';

    // Agregar cupones
    cupones.forEach(cupon => {
      contenido += `Cupon,${cupon.id},${cupon.codigo},${cupon.tipo === 'porcentaje' ? cupon.valor + '%' : 'S/' + cupon.valor}\n`;
    });

    // Agregar campañas
    campanas.forEach(campana => {
      contenido += `Campana,${campana.id},${campana.nombre},${campana.conversiones}\n`;
    });

    const blob = new Blob([contenido], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_marketing.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">Reportes Marketing</h1>
        <button
          onClick={exportarCSV}
          className="bg-[#39ff14] text-[#0a0a0a] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
        >
          Exportar CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de uso de cupones por mes */}
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Uso de Cupones por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={obtenerDatosUsoCupones()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="mes" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Line type="monotone" dataKey="uso" stroke="#39ff14" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de rendimiento de campañas */}
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Rendimiento de Campañas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={obtenerDatosRendimientoCampanas()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="nombre" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Bar dataKey="conversiones" fill="#39ff14" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cupones más usados */}
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Cupones Más Usados</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#39ff14]/30">
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Código</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Tipo</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Veces Usado</th>
                </tr>
              </thead>
              <tbody>
                {cuponesMasUsados.map((cupon) => (
                  <tr key={cupon.id} className="border-b border-[#39ff14]/20">
                    <td className="text-white font-['inter'] py-3 px-4">{cupon.codigo}</td>
                    <td className="text-white font-['inter'] py-3 px-4">{cupon.tipo}</td>
                    <td className="text-[#39ff14] font-['orbitron'] py-3 px-4">{cupon.vecesUsado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campañas por ROI */}
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Campañas por ROI</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#39ff14]/30">
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Nombre</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">Conversiones</th>
                  <th className="text-gray-400 font-['inter'] py-3 px-4">ROI</th>
                </tr>
              </thead>
              <tbody>
                {campanasPorROI.map((campana) => (
                  <tr key={campana.id} className="border-b border-[#39ff14]/20">
                    <td className="text-white font-['inter'] py-3 px-4">{campana.nombre}</td>
                    <td className="text-[#39ff14] font-['orbitron'] py-3 px-4">{campana.conversiones}</td>
                    <td className="text-[#39ff14] font-['orbitron'] py-3 px-4">{campana.roi.toFixed(2)}%</td>
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

export default ReportesMarketing;
