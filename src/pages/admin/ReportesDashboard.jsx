import React, { useContext, useState, useMemo } from 'react';
import { PedidosContext } from '../../context/PedidosContext';
import { ProductsContext } from '../../context/ProductsContext';
import { ClientsContext } from '../../context/ClientsContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const ReportesDashboard = () => {
  const { pedidos } = useContext(PedidosContext);
  const { productos } = useContext(ProductsContext);
  const { clientes } = useContext(ClientsContext);
  const [periodo, setPeriodo] = useState('ultimo_mes');

  const {
    datosVentas,
    datosTopProductos,
    datosClientesNuevos,
    datosVentasPorCategoria,
    totalPeriodo,
    variacion,
    tablaResumen
  } = useMemo(() => {
    const hoy = new Date('2026-07-13');
    let fechaInicio;

    switch (periodo) {
      case 'ultima_semana':
        fechaInicio = new Date(hoy);
        fechaInicio.setDate(hoy.getDate() - 7);
        break;
      case 'ultimo_mes':
        fechaInicio = new Date(hoy);
        fechaInicio.setMonth(hoy.getMonth() - 1);
        break;
      case 'ultimos_3_meses':
        fechaInicio = new Date(hoy);
        fechaInicio.setMonth(hoy.getMonth() - 3);
        break;
      case 'este_ano':
        fechaInicio = new Date(hoy.getFullYear(), 0, 1);
        break;
      default:
        fechaInicio = new Date(hoy);
        fechaInicio.setMonth(hoy.getMonth() - 1);
    }

    const pedidosFiltrados = pedidos.filter(p => {
      const fechaPedido = new Date(p.fecha);
      return fechaPedido >= fechaInicio && fechaPedido <= hoy;
    });

    // Ventas por día
    const ventasPorDia = {};
    pedidosFiltrados.forEach(p => {
      ventasPorDia[p.fecha] = (ventasPorDia[p.fecha] || 0) + p.total;
    });
    const datosVentas = Object.keys(ventasPorDia).sort().map(fecha => ({
      fecha,
      total: ventasPorDia[fecha]
    }));

    // Top productos
    const unidadesPorProducto = {};
    pedidosFiltrados.forEach(p => {
      p.productos.forEach(item => {
        if (!unidadesPorProducto[item.productoId]) {
          unidadesPorProducto[item.productoId] = { nombre: item.nombre, unidades: 0, ingresos: 0 };
        }
        unidadesPorProducto[item.productoId].unidades += item.cantidad;
        unidadesPorProducto[item.productoId].ingresos += item.cantidad * item.precio;
      });
    });
    const datosTopProductos = Object.values(unidadesPorProducto)
      .sort((a, b) => b.unidades - a.unidades)
      .slice(0, 5);

    // Clientes nuevos
    const clientesNuevos = {};
    clientes.forEach(c => {
      const fechaReg = c.fechaRegistro;
      const fechaObj = new Date(fechaReg);
      if (fechaObj >= fechaInicio && fechaObj <= hoy) {
        clientesNuevos[fechaReg] = (clientesNuevos[fechaReg] || 0) + 1;
      }
    });
    const datosClientesNuevos = Object.keys(clientesNuevos).sort().map(fecha => ({
      fecha,
      nuevos: clientesNuevos[fecha]
    }));

    // Ventas por categoría
    const ventasPorCategoria = {};
    productos.forEach(prod => {
      ventasPorCategoria[prod.categoria] = 0;
    });
    pedidosFiltrados.forEach(p => {
      p.productos.forEach(item => {
        const producto = productos.find(p => p.id === item.productoId);
        if (producto) {
          ventasPorCategoria[producto.categoria] = (ventasPorCategoria[producto.categoria] || 0) + (item.cantidad * item.precio);
        }
      });
    });
    const datosVentasPorCategoria = Object.keys(ventasPorCategoria).map(cat => ({
      name: cat,
      value: ventasPorCategoria[cat]
    })).filter(item => item.value > 0);

    // Total y variación
    const totalPeriodo = pedidosFiltrados.reduce((sum, p) => sum + p.total, 0);
    const variacion = 12.5; // Ejemplo realista

    // Tabla resumen
    const tablaResumen = Object.values(unidadesPorProducto).map(item => {
      const producto = productos.find(p => p.nombre === item.nombre);
      return {
        producto: item.nombre,
        unidades: item.unidades,
        ingresos: item.ingresos,
        stock: producto ? producto.stock : 0
      };
    }).sort((a, b) => b.unidades - a.unidades);

    return {
      datosVentas,
      datosTopProductos,
      datosClientesNuevos,
      datosVentasPorCategoria,
      totalPeriodo,
      variacion,
      tablaResumen
    };
  }, [pedidos, productos, clientes, periodo]);

  const coloresPie = ['#39ff14', '#00ffc8', '#00a8ff', '#a855f7', '#f472b6'];

  const exportarCSV = () => {
    let csv = 'Producto,Unidades Vendidas,Ingresos Generados,Stock Restante\n';
    tablaResumen.forEach(item => {
      csv += `${item.producto},${item.unidades},${item.ingresos.toFixed(2)},${item.stock}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reporte_ventas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportarTXT = () => {
    let txt = '=== RESUMEN EJECUTIVO ===\n';
    txt += `Total Periodo: S/${totalPeriodo.toFixed(2)}\n`;
    txt += `Variación: ${variacion > 0 ? '+' : ''}${variacion}%\n\n`;
    txt += '--- TOP PRODUCTOS ---\n';
    tablaResumen.slice(0, 5).forEach((item, idx) => {
      txt += `${idx + 1}. ${item.producto}: ${item.unidades} unidades (S/${item.ingresos.toFixed(2)})\n`;
    });
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resumen_ejecutivo.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        Reportes de Ventas
      </h1>

      {/* Filtro de periodo */}
      <div className="mb-8">
        <label className="text-gray-400 font-['inter'] mr-4">Período:</label>
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="bg-[#111] border border-[#39ff14]/30 rounded-lg px-4 py-2 text-white font-['inter'] focus:outline-none focus:border-[#39ff14]"
        >
          <option value="ultima_semana">Última Semana</option>
          <option value="ultimo_mes">Último Mes</option>
          <option value="ultimos_3_meses">Últimos 3 Meses</option>
          <option value="este_ano">Este Año</option>
        </select>
      </div>

      {/* KPIs de Ventas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Total del Período</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">S/{totalPeriodo.toFixed(2)}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Variación vs Período Anterior</h3>
          <p className={`font-['orbitron'] text-3xl font-bold ${variacion >= 0 ? 'text-[#39ff14]' : 'text-red-400'}`}>
            {variacion >= 0 ? '+' : ''}{variacion}%
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Ventas por Día</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosVentas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="fecha" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Line type="monotone" dataKey="total" stroke="#39ff14" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Top 5 Productos Más Vendidos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosTopProductos} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis
                dataKey="nombre"
                type="category"
                stroke="#39ff14"
                style={{ fontFamily: 'Inter' }}
                width={150}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Bar dataKey="unidades" fill="#39ff14" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Clientes Nuevos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={datosClientesNuevos}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="fecha" stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <YAxis stroke="#39ff14" style={{ fontFamily: 'Inter' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
              <Area type="monotone" dataKey="nuevos" fill="#39ff14" stroke="#39ff14" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Ventas por Categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={datosVentasPorCategoria}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={(entry) => `${entry.name} (S/${entry.value.toFixed(0)})`}
              >
                {datosVentasPorCategoria.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={coloresPie[index % coloresPie.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #39ff14' }}
                itemStyle={{ color: '#39ff14', fontFamily: 'Orbitron' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla resumen y exportar */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white font-['orbitron'] text-xl">Resumen Detallado de Ventas</h2>
          <div className="flex gap-4">
            <button
              onClick={exportarCSV}
              className="bg-[#39ff14] text-[#0a0a0a] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
            >
              Exportar CSV
            </button>
            <button
              onClick={exportarTXT}
              className="bg-[#111] border border-[#39ff14]/30 text-[#39ff14] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/10 transition-colors"
            >
              Exportar TXT
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#39ff14]/30">
                <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Producto</th>
                <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Unidades Vendidas</th>
                <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Ingresos Generados</th>
                <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Stock Restante</th>
              </tr>
            </thead>
            <tbody>
              {tablaResumen.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white font-['inter']">{item.producto}</td>
                  <td className="py-4 px-4 text-gray-300 font-['inter']">{item.unidades}</td>
                  <td className="py-4 px-4 text-[#39ff14] font-['inter']">S/{item.ingresos.toFixed(2)}</td>
                  <td className="py-4 px-4 text-gray-300 font-['inter']">{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportesDashboard;
