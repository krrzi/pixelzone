import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PedidosContext } from '../../context/PedidosContext';

const FinanzasAdmin = () => {
  const { pedidos } = useContext(PedidosContext);

  const ingresosTotales = pedidos.reduce((total, pedido) => total + Number(pedido.total), 0);
  const costosEstimados = ingresosTotales * 0.6;
  const margenGanancia = ingresosTotales - costosEstimados;

  const formatSoles = (valor) => 'S/' + valor.toFixed(2);

  const datosFlujoCaja = [
    { semana: 'Semana 1', ingresos: 4500, costos: 2700, ganancia: 1800 },
    { semana: 'Semana 2', ingresos: 5200, costos: 3120, ganancia: 2080 },
    { semana: 'Semana 3', ingresos: 4800, costos: 2880, ganancia: 1920 },
    { semana: 'Semana 4', ingresos: 6100, costos: 3660, ganancia: 2440 }
  ];

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-8">
          Finanzas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
            <h3 className="text-gray-400 font-inter text-sm mb-2">Ingresos Totales</h3>
            <p className="text-neon-green font-orbitron text-3xl font-bold">
              {formatSoles(ingresosTotales)}
            </p>
          </div>
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
            <h3 className="text-gray-400 font-inter text-sm mb-2">Costos Estimados</h3>
            <p className="text-red-400 font-orbitron text-3xl font-bold">
              {formatSoles(costosEstimados)}
            </p>
          </div>
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
            <h3 className="text-gray-400 font-inter text-sm mb-2">Margen de Ganancia</h3>
            <p className="text-green-400 font-orbitron text-3xl font-bold">
              {formatSoles(margenGanancia)}
            </p>
          </div>
        </div>

        <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
          <h2 className="text-neon-green font-orbitron text-xl font-bold mb-6">
            Flujo de Caja por Semana
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datosFlujoCaja}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="semana" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0a0a',
                    border: '1px solid #39ff14'
                  }}
                  formatter={(value) => ['S/' + value.toFixed(2), '']}
                />
                <Bar dataKey="ingresos" fill="#39ff14" name="Ingresos" />
                <Bar dataKey="costos" fill="#ef4444" name="Costos" />
                <Bar dataKey="ganancia" fill="#22c55e" name="Ganancia" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanzasAdmin;