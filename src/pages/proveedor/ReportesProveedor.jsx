import React, { useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ProveedoresContext } from '../../context/ProveedoresContext';
import { productos } from '../../data/productos';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const datosValorSuministrado = [
  { mes: 'Feb', valor: 2500 },
  { mes: 'Mar', valor: 4200 },
  { mes: 'Abr', valor: 3800 },
  { mes: 'May', valor: 5100 },
  { mes: 'Jun', valor: 4600 },
  { mes: 'Jul', valor: 4000 }
];

const ReportesProveedor = () => {
  const { usuario } = useAuth();
  const { getProveedorByEmail, ordenesCompra } = useContext(ProveedoresContext);
  const proveedorLogueado = getProveedorByEmail(usuario?.email);
  
  const ordenesProveedor = proveedorLogueado 
    ? ordenesCompra.filter(o => o.proveedorId === proveedorLogueado.id) 
    : [];

  const productosSolicitados = {};
  ordenesProveedor.forEach(orden => {
    orden.productos.forEach(item => {
      if (!productosSolicitados[item.productoId]) {
        productosSolicitados[item.productoId] = { cantidad: 0, producto: productos.find(p => p.id === item.productoId) };
      }
      productosSolicitados[item.productoId].cantidad += item.cantidad;
    });
  });

  const productosMasSolicitados = Object.values(productosSolicitados)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  const tasaEntregasATiempo = 85; // simulado

  const handleExportarResumen = () => {
    const contenido = `Resumen Proveedor: ${proveedorLogueado?.empresa}
Total Órdenes: ${ordenesProveedor.length}
Total Valor Suministrado: S/ ${ordenesProveedor.filter(o => o.estado === 'Recibido').reduce((sum, o) => sum + o.total, 0).toFixed(2)}
Tasa Entregas a Tiempo: ${tasaEntregasATiempo}%
    `;
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resumen_proveedor.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        Reportes Proveedor
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Valor Suministrado por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosValorSuministrado}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="mes" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Line type="monotone" dataKey="valor" stroke="#39ff14" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Productos Más Solicitados</h2>
          <div className="space-y-4">
            {productosMasSolicitados.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-[#39ff14]/20 pb-3">
                <p className="text-white font-['inter']">{item.producto?.nombre}</p>
                <p className="text-[#39ff14] font-['orbitron']">{item.cantidad} unidades</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Tasa Entregas a Tiempo</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{tasaEntregasATiempo}%</p>
        </div>
      </div>

      <button
        onClick={handleExportarResumen}
        className="bg-[#39ff14] text-[#0a0a0a] px-8 py-3 rounded font-['orbitron'] font-bold hover:bg-[#39ff14]/80"
      >
        Exportar Resumen como TXT
      </button>
    </div>
  );
};

export default ReportesProveedor;
