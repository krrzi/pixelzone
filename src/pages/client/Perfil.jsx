import React, { useState, useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PedidosContext } from '../../context/PedidosContext';
import { ClientsContext } from '../../context/ClientsContext';
import { WishlistContext } from '../../context/WishlistContext';
import { useCart } from '../../hooks/useCart';

const Perfil = () => {
  const { usuario } = useAuth();
  const { pedidos } = useContext(PedidosContext);
  const { clientes, actualizarCliente } = useContext(ClientsContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useCart();

  const cliente = clientes.find(c => c.email === usuario.email);
  const misPedidos = pedidos.filter(p => p.email === usuario.email);

  // State for UI
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [pedidoExpandido, setPedidoExpandido] = useState(null);
  const [editandoDatos, setEditandoDatos] = useState(false);
  const [formDatos, setFormDatos] = useState({
    telefono: cliente?.telefono || '',
    direccion: cliente?.direccion || ''
  });

  // Calculate user stats
  const totalGastado = cliente?.totalGastado || 0;
  const puntosRecompensa = Math.floor(totalGastado);
  const totalPedidos = cliente?.totalCompras || 0;

  // Get user level based on total spent
  const getNivel = (gasto) => {
    if (gasto < 100) return { nombre: 'Bronze', color: 'text-orange-500', bg: 'bg-orange-500/20' };
    if (gasto < 300) return { nombre: 'Silver', color: 'text-gray-400', bg: 'bg-gray-400/20' };
    if (gasto < 600) return { nombre: 'Gold', color: 'text-yellow-500', bg: 'bg-yellow-500/20' };
    return { nombre: 'Diamond', color: 'text-cyan-400', bg: 'bg-cyan-400/20' };
  };

  const nivel = getNivel(totalGastado);

  // Get favorite product/category
  const getFavorito = () => {
    const productosComprados = {};
    misPedidos.forEach(pedido => {
      pedido.productos.forEach(prod => {
        if (!productosComprados[prod.productoId]) {
          productosComprados[prod.productoId] = {
            nombre: prod.nombre,
            cantidad: 0
          };
        }
        productosComprados[prod.productoId].cantidad += prod.cantidad;
      });
    });

    const sorted = Object.values(productosComprados).sort((a, b) => b.cantidad - a.cantidad);
    return sorted[0]?.nombre || 'N/A';
  };

  const productoFavorito = getFavorito();

  // Filter orders
  const pedidosFiltrados = filtroEstado === 'Todos'
    ? misPedidos
    : misPedidos.filter(p => p.estado === filtroEstado);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Entregado': return 'text-green-400';
      case 'En camino': return 'text-yellow-400';
      case 'Pendiente': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  // Handle form
  const handleGuardarDatos = () => {
    actualizarCliente(usuario.email, formDatos);
    setEditandoDatos(false);
  };

  // Handle reorder
  const handleVolverAComprar = (productos) => {
    productos.forEach(prod => {
      addToCart({
        id: prod.productoId,
        nombre: prod.nombre,
        precio: prod.precio,
        cantidad: prod.cantidad,
        imagen: ''
      });
    });
  };

  // Get initials for avatar
  const getIniciales = (nombre) => {
    return nombre
      .split(' ')
      .map(p => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header de Perfil Mejorado */}
        <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center text-4xl font-orbitron font-bold ${nivel.bg} ${nivel.color}`}>
              {getIniciales(usuario.nombre)}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h1 className="text-neon-green font-orbitron text-3xl font-bold">{usuario.nombre}</h1>
                <span className={`px-4 py-1 rounded-full font-orbitron font-bold ${nivel.bg} ${nivel.color}`}>
                  {nivel.nombre}
                </span>
              </div>
              <p className="text-gray-400 font-inter mt-2">{usuario.email}</p>
              <p className="text-gray-500 font-inter text-sm mt-1">
                Miembro desde: {new Date(cliente?.fechaRegistro || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Tarjetas de Estadísticas Personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green transition-all">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-gray-400 font-inter text-sm">Total Gastado</h3>
            <p className="text-neon-green font-orbitron text-2xl font-bold mt-2">
              ${totalGastado.toFixed(2)}
            </p>
          </div>

          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green transition-all">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="text-gray-400 font-inter text-sm">Pedidos Realizados</h3>
            <p className="text-neon-green font-orbitron text-2xl font-bold mt-2">
              {totalPedidos}
            </p>
          </div>

          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green transition-all">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-gray-400 font-inter text-sm">Producto Favorito</h3>
            <p className="text-white font-orbitron text-lg font-bold mt-2">
              {productoFavorito}
            </p>
          </div>

          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 hover:border-neon-green transition-all">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="text-gray-400 font-inter text-sm">Puntos de Recompensa</h3>
            <p className="text-neon-green font-orbitron text-2xl font-bold mt-2">
              {puntosRecompensa}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sección Izquierda: Datos Personales y Favoritos */}
          <div className="space-y-8">
            {/* Datos Editables */}
            <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-neon-green font-orbitron text-xl font-bold">Datos Personales</h2>
                <button
                  onClick={() => setEditandoDatos(!editandoDatos)}
                  className="text-neon-green hover:text-white font-inter text-sm border border-neon-green/50 px-4 py-1 rounded hover:border-neon-green transition-all"
                >
                  {editandoDatos ? 'Cancelar' : 'Editar'}
                </button>
              </div>

              {editandoDatos ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 font-inter text-sm block mb-2">Teléfono</label>
                    <input
                      type="text"
                      value={formDatos.telefono}
                      onChange={(e) => setFormDatos({ ...formDatos, telefono: e.target.value })}
                      className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded focus:outline-none focus:border-neon-green font-inter"
                      placeholder="+54 9 11 1234-5678"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 font-inter text-sm block mb-2">Dirección de Envío</label>
                    <textarea
                      value={formDatos.direccion}
                      onChange={(e) => setFormDatos({ ...formDatos, direccion: e.target.value })}
                      className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded focus:outline-none focus:border-neon-green font-inter"
                      placeholder="Calle 123, Departamento 4B, Ciudad"
                      rows={3}
                    />
                  </div>
                  <button
                    onClick={handleGuardarDatos}
                    className="w-full bg-neon-green text-dark-bg px-6 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-green/80 transition-all"
                  >
                    Guardar Cambios
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 font-inter text-sm">Teléfono</p>
                    <p className="text-white font-inter">{cliente?.telefono || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-inter text-sm">Dirección</p>
                    <p className="text-white font-inter">{cliente?.direccion || 'No especificada'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sección de Favoritos */}
            <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
              <h2 className="text-neon-green font-orbitron text-xl font-bold mb-6">
                ❤️ Favoritos
              </h2>

              {wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">🤍</div>
                  <p className="text-gray-400 font-inter">No tienes productos favoritos</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((producto) => (
                    <div key={producto.id} className="flex gap-4 items-center border border-neon-green/20 rounded-lg p-3">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-inter truncate">{producto.nombre}</p>
                        <p className="text-neon-green font-orbitron font-bold">${producto.precio.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(producto)}
                          className="bg-neon-green text-dark-bg px-3 py-1 rounded font-bold text-sm hover:bg-neon-green/80"
                        >
                          Añadir
                        </button>
                        <button
                          onClick={() => toggleWishlist(producto)}
                          className="text-red-400 hover:text-red-300 text-xl"
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sección Derecha: Historial de Pedidos */}
          <div className="lg:col-span-2">
            <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-neon-green font-orbitron text-xl font-bold">
                  📦 Historial de Pedidos
                </h2>

                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="bg-dark-bg border border-neon-green/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-neon-green font-inter"
                >
                  {['Todos', 'Pendiente', 'En camino', 'Entregado'].map((estado) => (
                    <option key={estado} value={estado} className="bg-dark-bg">
                      {estado}
                    </option>
                  ))}
                </select>
              </div>

              {pedidosFiltrados.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 font-inter">No hay pedidos que mostrar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pedidosFiltrados.map((pedido) => (
                    <div
                      key={pedido.id}
                      className="border border-neon-green/20 rounded-lg overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => setPedidoExpandido(pedidoExpandido === pedido.id ? null : pedido.id)}
                        className="w-full p-4 text-left bg-transparent hover:bg-neon-green/10 transition-all flex justify-between items-center"
                      >
                        <div>
                          <p className="text-white font-orbitron font-bold">Pedido #{pedido.id}</p>
                          <p className="text-gray-500 font-inter text-sm">
                            {new Date(pedido.fecha).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className={`font-orbitron font-bold ${getEstadoColor(pedido.estado)}`}>
                            {pedido.estado}
                          </span>
                          <span className="text-neon-green font-orbitron font-bold text-lg">
                            ${pedido.total.toFixed(2)}
                          </span>
                          <span className="text-neon-green text-2xl transition-transform duration-300" style={{ transform: pedidoExpandido === pedido.id ? 'rotate(180deg)' : 'rotate(0)' }}>
                            ▼
                          </span>
                        </div>
                      </button>

                      {pedidoExpandido === pedido.id && (
                        <div className="border-t border-neon-green/20 p-4 space-y-4 animate-fadeIn">
                          <div>
                            <p className="text-gray-400 font-inter text-sm mb-2">Productos:</p>
                            <div className="space-y-2">
                              {pedido.productos.map((prod, idx) => (
                                <div key={idx} className="flex justify-between items-center text-gray-300 font-inter">
                                  <span>{prod.cantidad}x {prod.nombre}</span>
                                  <span>${(prod.cantidad * prod.precio).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-500 font-inter text-sm">Método de Pago</p>
                              <p className="text-white font-inter">
                                {pedido.metodoPago === 'tarjeta' ? 'Tarjeta' : pedido.metodoPago === 'paypal' ? 'PayPal' : 'Yape/Plin'}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleVolverAComprar(pedido.productos)}
                            className="w-full border border-neon-green text-neon-green px-6 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-green hover:text-dark-bg transition-all"
                          >
                            🔄 Volver a Comprar
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
