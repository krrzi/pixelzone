import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ProductsContext } from '../../context/ProductsContext';
import { PedidosContext } from '../../context/PedidosContext';
import { ClientsContext } from '../../context/ClientsContext';

const Dashboard = () => {
  const { productos } = useContext(ProductsContext);
  const { pedidos } = useContext(PedidosContext);
  const { clientes } = useContext(ClientsContext);
  
  const ventasTotales = pedidos.reduce((total, pedido) => total + pedido.total, 0);
  const pedidosMes = pedidos.length;
  const productosStock = productos.reduce((total, producto) => total + producto.stock, 0);
  const clientesRegistrados = clientes.length;

  // 1. Calcular producto más y menos vendido
  const ventasPorProducto = {};
  pedidos.forEach(pedido => {
    pedido.productos.forEach(producto => {
      if (!ventasPorProducto[producto.productoId]) {
        ventasPorProducto[producto.productoId] = 0;
      }
      ventasPorProducto[producto.productoId] += producto.cantidad;
    });
  });

  // Convertir a array y ordenar
  const productosOrdenadosVentas = Object.entries(ventasPorProducto)
    .map(([id, cantidad]) => {
      const producto = productos.find(p => p.id === parseInt(id));
      return { id: parseInt(id), nombre: producto?.nombre || 'Producto', cantidad };
    })
    .sort((a, b) => b.cantidad - a.cantidad);

  const productoMasVendido = productosOrdenadosVentas[0];
  const productoMenosVendido = productosOrdenadosVentas[productosOrdenadosVentas.length - 1];

  // 2. Ticket promedio
  const ticketPromedio = pedidosMes > 0 ? ventasTotales / pedidosMes : 0;

  // 3. Comparativa mes actual vs mes anterior (simulación)
  const ventasMesActual = ventasTotales;
  const ventasMesAnterior = ventasTotales * 0.8; // Simulación de 80% del mes actual
  const porcentajeCambio = ((ventasMesActual - ventasMesAnterior) / ventasMesAnterior) * 100;

  // 4. Datos para gráfica de pastel por categoría
  const ventasPorCategoria = {};
  pedidos.forEach(pedido => {
    pedido.productos.forEach(producto => {
      const prod = productos.find(p => p.nombre === producto.nombre);
      const categoria = prod?.categoria || 'Otros';
      if (!ventasPorCategoria[categoria]) {
        ventasPorCategoria[categoria] = 0;
      }
      ventasPorCategoria[categoria] += producto.cantidad * (prod?.precio || 0);
    });
  });

  const datosPieChart = Object.entries(ventasPorCategoria).map(([categoria, total]) => ({
    name: categoria,
    value: total
  }));

  const coloresPie = ['#39ff14', '#22c55e', '#eab308', '#f97316', '#ef4444', '#a855f7'];

  // 5. Alertas
  const productosBajoStock = productos.filter(p => p.stock < 5);
  const fechaHoy = new Date();
  const pedidosPendientesAntiguos = pedidos.filter(pedido => {
    if (pedido.estado !== 'Pendiente') return false;
    const fechaPedido = new Date(pedido.fecha);
    const diferenciaDias = (fechaHoy - fechaPedido) / (1000 * 60 * 60 * 24);
    return diferenciaDias > 3;
  });

  const datosVentas = [
    { dia: 'Lun', ventas: 400 },
    { dia: 'Mar', ventas: 300 },
    { dia: 'Mié', ventas: 500 },
    { dia: 'Jue', ventas: 450 },
    { dia: 'Vie', ventas: 600 },
    { dia: 'Sáb', ventas: 700 },
    { dia: 'Dom', ventas: 550 },
  ];

  const tarjetasPrimeraFila = [
    {
      titulo: 'Ventas Totales',
      valor: `$${ventasTotales.toFixed(2)}`,
      color: 'text-neon-green',
      icono: '💰',
    },
    {
      titulo: 'Pedidos del Mes',
      valor: pedidosMes,
      color: 'text-blue-400',
      icono: '📦',
    },
    {
      titulo: 'Productos en Stock',
      valor: productosStock,
      color: 'text-yellow-400',
      icono: '📊',
    },
    {
      titulo: 'Clientes Registrados',
      valor: clientesRegistrados,
      color: 'text-purple-400',
      icono: '👥',
    },
  ];

  const tarjetasSegundaFila = [
    {
      titulo: 'Producto Más Vendido',
      valor: productoMasVendido?.nombre || 'N/A',
      subtitulo: `${productoMasVendido?.cantidad || 0} unidades`,
      color: 'text-green-400',
      icono: '🔥',
    },
    {
      titulo: 'Producto Menos Vendido',
      valor: productoMenosVendido?.nombre || 'N/A',
      subtitulo: `${productoMenosVendido?.cantidad || 0} unidades`,
      color: 'text-red-400',
      icono: '❄️',
    },
    {
      titulo: 'Ticket Promedio',
      valor: `$${ticketPromedio.toFixed(2)}`,
      color: 'text-yellow-400',
      icono: '💳',
    },
    {
      titulo: 'Crecimiento Mensual',
      valor: `${porcentajeCambio > 0 ? '+' : ''}${porcentajeCambio.toFixed(1)}%`,
      color: porcentajeCambio >= 0 ? 'text-green-400' : 'text-red-400',
      icono: '📈',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-8">
          Panel de Administración
        </h1>

        {/* Tarjetas de KPIs primera fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tarjetasPrimeraFila.map((tarjeta, index) => (
            <div
              key={index}
              className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green transition-colors"
            >
              <div className="text-4xl mb-2">{tarjeta.icono}</div>
              <h3 className="text-gray-400 font-inter text-sm">{tarjeta.titulo}</h3>
              <p className={`font-orbitron text-3xl font-bold ${tarjeta.color}`}>
                {tarjeta.valor}
              </p>
            </div>
          ))}
        </div>

        {/* Tarjetas de KPIs segunda fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tarjetasSegundaFila.map((tarjeta, index) => (
            <div
              key={index}
              className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green transition-colors"
            >
              <div className="text-4xl mb-2">{tarjeta.icono}</div>
              <h3 className="text-gray-400 font-inter text-sm">{tarjeta.titulo}</h3>
              <p className={`font-orbitron text-3xl font-bold ${tarjeta.color}`}>
                {tarjeta.valor}
              </p>
              {tarjeta.subtitulo && (
                <p className="text-gray-500 font-inter text-sm mt-1">
                  {tarjeta.subtitulo}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Ventas */}
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
            <h2 className="text-neon-green font-orbitron text-xl font-bold mb-6">
              Ventas Semanales
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={datosVentas}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="dia" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0a0a0a',
                      border: '1px solid #39ff14',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ventas"
                    stroke="#39ff14"
                    strokeWidth={2}
                    dot={{ fill: '#39ff14' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Pastel por Categoría */}
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
            <h2 className="text-neon-green font-orbitron text-xl font-bold mb-6">
              Ventas por Categoría
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={datosPieChart}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {datosPieChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={coloresPie[index % coloresPie.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0a0a0a',
                      border: '1px solid #39ff14',
                    }}
                    formatter={(value) => [`$${value.toFixed(2)}`, 'Ventas']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 mb-8">
          <h2 className="text-neon-green font-orbitron text-xl font-bold mb-6">
            Alertas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Productos con bajo stock */}
            <div className="border border-red-400/30 rounded-lg p-4">
              <h3 className="text-red-400 font-orbitron font-bold mb-3">
                ⚠️ Productos con Bajo Stock ({productosBajoStock.length})
              </h3>
              {productosBajoStock.length === 0 ? (
                <p className="text-gray-400 font-inter">No hay productos con bajo stock</p>
              ) : (
                <ul className="space-y-2">
                  {productosBajoStock.slice(0, 5).map(producto => (
                    <li key={producto.id} className="text-gray-300 font-inter flex justify-between">
                      <span>{producto.nombre}</span>
                      <span className="text-red-400 font-bold">{producto.stock} unidades</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pedidos pendientes antiguos */}
            <div className="border border-yellow-400/30 rounded-lg p-4">
              <h3 className="text-yellow-400 font-orbitron font-bold mb-3">
                ⏳ Pedidos Pendientes (más de 3 días) ({pedidosPendientesAntiguos.length})
              </h3>
              {pedidosPendientesAntiguos.length === 0 ? (
                <p className="text-gray-400 font-inter">No hay pedidos pendientes antiguos</p>
              ) : (
                <ul className="space-y-2">
                  {pedidosPendientesAntiguos.map(pedido => (
                    <li key={pedido.id} className="text-gray-300 font-inter flex justify-between">
                      <span>Pedido #{pedido.id} - {pedido.cliente}</span>
                      <span className="text-yellow-400 font-bold">${pedido.total.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/productos"
            className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green hover:bg-neon-green/10 transition-all group"
          >
            <h3 className="text-white font-orbitron text-lg mb-2 group-hover:text-neon-green">
              Gestionar Productos
            </h3>
            <p className="text-gray-400 font-inter text-sm">
              Añadir, editar y eliminar productos
            </p>
          </Link>

          <Link
            to="/admin/proveedores"
            className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green hover:bg-neon-green/10 transition-all group"
          >
            <h3 className="text-white font-orbitron text-lg mb-2 group-hover:text-neon-green">
              Proveedores
            </h3>
            <p className="text-gray-400 font-inter text-sm">
              Ver y gestionar proveedores
            </p>
          </Link>

          <Link
            to="/admin/inventario"
            className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green hover:bg-neon-green/10 transition-all group"
          >
            <h3 className="text-white font-orbitron text-lg mb-2 group-hover:text-neon-green">
              Inventario
            </h3>
            <p className="text-gray-400 font-inter text-sm">
              Controlar stock de productos
            </p>
          </Link>

          <Link
            to="/admin/pedidos"
            className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green hover:bg-neon-green/10 transition-all group"
          >
            <h3 className="text-white font-orbitron text-lg mb-2 group-hover:text-neon-green">
              Pedidos
            </h3>
            <p className="text-gray-400 font-inter text-sm">
              Gestionar pedidos de clientes
            </p>
          </Link>

          <Link
            to="/admin/clientes"
            className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green hover:bg-neon-green/10 transition-all group"
          >
            <h3 className="text-white font-orbitron text-lg mb-2 group-hover:text-neon-green">
              Clientes
            </h3>
            <p className="text-gray-400 font-inter text-sm">
              Ver y gestionar clientes
            </p>
          </Link>

          <Link
            to="/admin/finanzas"
            className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green hover:bg-neon-green/10 transition-all group"
          >
            <h3 className="text-white font-orbitron text-lg mb-2 group-hover:text-neon-green">
              Finanzas
            </h3>
            <p className="text-gray-400 font-inter text-sm">
              Ver reportes financieros
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
