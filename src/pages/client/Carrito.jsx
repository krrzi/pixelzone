import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { ProductsContext } from '../../context/ProductsContext';
import { PedidosContext } from '../../context/PedidosContext';
import { ClientsContext } from '../../context/ClientsContext';
import { MarketingContext } from '../../context/MarketingContext';

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { isAuthenticated, usuario } = useAuth();
  const { productos, actualizarStock } = useContext(ProductsContext);
  const { agregarPedido } = useContext(PedidosContext);
  const { registrarCompraCliente } = useContext(ClientsContext);
  const { validarCupon, incrementarUso } = useContext(MarketingContext);
  const navigate = useNavigate();

  // Checkout states
  const [paso, setPaso] = useState('resumen'); // resumen, pago, confirmacion
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [tarjeta, setTarjeta] = useState({ numero: '', fecha: '', cvv: '' });
  const [loading, setLoading] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  // Coupon states
  const [codigoCupon, setCodigoCupon] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(null);
  const [mensajeCupon, setMensajeCupon] = useState({ texto: '', tipo: '' });

  const calcularDescuento = () => {
    if (!cuponAplicado) return 0;
    const subtotal = getCartTotal();
    if (cuponAplicado.tipo === 'porcentaje') {
      return subtotal * (cuponAplicado.valor / 100);
    } else {
      return Math.min(cuponAplicado.valor, subtotal);
    }
  };

  const getTotalConDescuento = () => {
    const subtotal = getCartTotal();
    const descuento = calcularDescuento();
    return Math.max(0, subtotal - descuento);
  };

  // Validación tarjeta
  const validarTarjeta = () => {
    const numeroValido = /^\d{16}$/.test(tarjeta.numero.replace(/\s/g, ''));
    const fechaValida = /^(0[1-9]|1[0-2])\/\d{2}$/.test(tarjeta.fecha);
    const cvvValido = /^\d{3,4}$/.test(tarjeta.cvv);
    return numeroValido && fechaValida && cvvValido;
  };

  const handleFinalizarCompra = async () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Validación
    if (metodoPago === 'tarjeta' && !validarTarjeta()) {
      alert('Por favor, completa los datos de la tarjeta correctamente');
      return;
    }

    setLoading(true);

    if (metodoPago === 'paypal') {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Paso 1: Actualizar stock de productos
    cart.forEach(item => {
      const producto = productos.find(p => p.id === item.id);
      if (producto) {
        const nuevoStock = producto.stock - item.cantidad;
        actualizarStock(item.id, nuevoStock);
      }
    });

    // Paso 2: Incrementar uso del cupón si hay uno aplicado
    if (cuponAplicado) {
      incrementarUso(cuponAplicado.codigo);
    }

    // Paso 3: Crear pedido
    const total = getTotalConDescuento();
    const nuevoPedido = {
      cliente: usuario.nombre,
      email: usuario.email,
      productos: cart.map(item => ({
        productoId: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio
      })),
      total: total,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'pendiente',
      metodoPago: metodoPago,
      cuponAplicado: cuponAplicado?.codigo || null
    };
    const pedidoCreado = agregarPedido(nuevoPedido);

    // Paso 4: Actualizar cliente
    registrarCompraCliente(usuario.email, usuario.nombre, pedidoCreado.id, total);

    // Paso 5: Vaciar carrito
    clearCart();

    // Paso 6: Mostrar confirmación
    setPedidoConfirmado(pedidoCreado);
    setPaso('confirmacion');
    setLoading(false);
  };

  const handleAplicarCupon = () => {
    if (!codigoCupon.trim()) {
      setMensajeCupon({ texto: 'Por favor, ingresa un código de cupón', tipo: 'error' });
      return;
    }
    const cupon = validarCupon(codigoCupon);
    if (cupon) {
      setCuponAplicado(cupon);
      setMensajeCupon({ texto: `Cupón ${cupon.codigo} aplicado: -S/${calcularDescuento().toFixed(2)}`, tipo: 'exito' });
    } else {
      setMensajeCupon({ texto: 'Cupón inválido, vencido o agotado', tipo: 'error' });
      setCuponAplicado(null);
    }
  };

  const handleGoBack = () => {
    if (paso === 'pago') {
      setPaso('resumen');
    }
  };

  const formatCardNumber = (text) => {
    const v = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return v;
  };

  if (paso === 'confirmacion' && pedidoConfirmado) {
    return (
      <div className="min-h-screen bg-dark-bg py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-neon-green text-6xl mb-6">✓</div>
          <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-4">
            ¡Compra Realizada!
          </h1>
          <p className="text-gray-300 font-inter text-lg mb-8">
            Tu pedido #{pedidoConfirmado.id} ha sido procesado exitosamente.
          </p>

          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-white font-orbitron text-xl mb-4">Resumen del Pedido</h3>
            <div className="space-y-2">
              <p className="text-gray-300 font-inter">
                <span className="text-neon-green font-bold">Método de pago: </span>
                {
                  pedidoConfirmado.metodoPago === 'tarjeta' ? 'Tarjeta de Crédito/Débito' :
                  pedidoConfirmado.metodoPago === 'paypal' ? 'PayPal' :
                  'Yape/Plin'
                }
              </p>
              <p className="text-gray-300 font-inter">
                <span className="text-neon-green font-bold">Total: </span>
                S/${pedidoConfirmado.total.toFixed(2)}
              </p>
              <p className="text-gray-300 font-inter">
                <span className="text-neon-green font-bold">Productos: </span>
              </p>
              <ul className="ml-6">
                {pedidoConfirmado.productos.map((p, idx) => (
                  <li key={idx} className="text-gray-400 font-inter">
                    {p.cantidad}x {p.nombre}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/perfil"
              className="inline-block border border-neon-green text-neon-green px-8 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-green hover:text-dark-bg transition-colors"
            >
              Ver Historial
            </Link>
            <Link
              to="/"
              className="inline-block bg-neon-green text-dark-bg px-8 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-green/80 transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-dark-bg py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-4">
          Tu Carrito está Vacío
        </h1>
        <p className="text-gray-300 font-inter text-lg mb-8">
          No hay productos en tu carrito.
        </p>
        <Link
          to="/tienda"
          className="inline-block bg-neon-green text-dark-bg px-8 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-green/80 transition-colors"
        >
          Ir a la Tienda
        </Link>
      </div>
      </div>
    );
  }

  if (paso === 'pago') {
    return (
      <div className="min-h-screen bg-dark-bg py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleGoBack}
              className="text-neon-green hover:text-white transition-colors font-inter"
            >
              ← Volver al resumen
            </button>
            <h1 className="text-neon-green font-orbitron text-3xl font-bold">
              Pago
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Selección de método de pago */}
              <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
                <h3 className="text-white font-orbitron text-xl mb-4">Método de Pago</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setMetodoPago('tarjeta')}
                    className={`p-4 border rounded-lg transition-all ${
                      metodoPago === 'tarjeta' ? 'border-neon-green bg-neon-green/10' : 'border-gray-600'
                    }`}
                  >
                    💳 Tarjeta de crédito/débito
                  </button>
                  <button
                    onClick={() => setMetodoPago('paypal')}
                    className={`p-4 border rounded-lg transition-all ${
                      metodoPago === 'paypal' ? 'border-neon-green bg-neon-green/10' : 'border-gray-600'
                    }`}
                  >
                    🟦 PayPal
                  </button>
                  <button
                    onClick={() => setMetodoPago('yape')}
                    className={`p-4 border rounded-lg transition-all ${
                      metodoPago === 'yape' ? 'border-neon-green bg-neon-green/10' : 'border-gray-600'
                    }`}
                  >
                    💵 Yape/Plin
                  </button>
                </div>
              </div>

              {/* Formulario según método */}
              {metodoPago === 'tarjeta' && (
                <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 font-inter mb-2">Número de tarjeta</label>
                      <input
                        type="text"
                        value={tarjeta.numero}
                        onChange={(e) => setTarjeta({ ...tarjeta, numero: formatCardNumber(e.target.value) })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 font-inter mb-2">Fecha de vencimiento</label>
                        <input
                          type="text"
                          value={tarjeta.fecha}
                          onChange={(e) => setTarjeta({ ...tarjeta, fecha: e.target.value })}
                          placeholder="MM/AA"
                          maxLength={5}
                          className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-inter mb-2">CVV</label>
                        <input
                          type="text"
                          value={tarjeta.cvv}
                          onChange={(e) => setTarjeta({ ...tarjeta, cvv: e.target.value })}
                          placeholder="123"
                          maxLength={4}
                          className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {metodoPago === 'paypal' && (
                <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 text-center">
                  {loading ? (
                    <div className="py-8">
                      <div className="animate-spin text-neon-green text-4xl mb-4">⚡</div>
                      <p className="text-gray-300 font-inter">Conectando con PayPal...</p>
                    </div>
                  ) : (
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-orbitron font-bold hover:bg-blue-700 transition-colors">
                      Conectar con PayPal
                    </button>
                  )}
                </div>
              )}

              {metodoPago === 'yape' && (
                <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 text-center">
                  <div className="mb-6">
                    <img src="https://placehold.co/200x200?text=QR+PAGO" alt="QR" className="mx-auto rounded-lg" />
                  </div>
                  <p className="text-gray-300 font-inter mb-4">Escanea el código QR para pagar</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 sticky top-24">
                <h2 className="text-neon-green font-orbitron text-xl font-bold mb-4">
                  Resumen del Pedido
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300 font-inter">
                    <span>Subtotal</span>
                    <span>S/{getCartTotal().toFixed(2)}</span>
                  </div>
                  {cuponAplicado && (
                    <div className="flex justify-between text-green-400 font-inter">
                      <span>Descuento ({cuponAplicado.codigo})</span>
                      <span>-S/{calcularDescuento().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-300 font-inter">
                    <span>Envío</span>
                    <span>Gratis</span>
                  </div>
                  <hr className="border-neon-green/30" />
                  <div className="flex justify-between text-neon-green font-orbitron font-bold text-xl">
                    <span>Total</span>
                    <span>S/{getTotalConDescuento().toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleFinalizarCompra}
                  disabled={loading}
                  className="w-full bg-neon-green text-dark-bg px-6 py-3 rounded-lg font-orbitron font-bold mt-6 hover:bg-neon-green/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Procesando...' : 'Confirmar Pago'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista de resumen
  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-neon-green font-orbitron text-4xl font-bold mb-8">
          Tu Carrito
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-dark-bg border border-neon-green/30 rounded-lg p-4 flex gap-4"
            >
              <img
                src={item.imagen}
                alt={item.nombre}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="text-white font-orbitron text-lg">
                  {item.nombre}
                </h3>
                <p className="text-neon-green font-orbitron font-bold">
                  S/{item.precio.toFixed(2)}
                </p>

                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                    className="bg-neon-green/20 text-neon-green w-8 h-8 rounded hover:bg-neon-green/30 transition-colors disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="text-white font-inter w-8 text-center">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                    className="bg-neon-green/20 text-neon-green w-8 h-8 rounded hover:bg-neon-green/30 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-white font-orbitron font-bold">
                  S/{(item.precio * item.cantidad).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-300 mt-2 font-inter"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

          <div className="lg:col-span-1">
            <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 sticky top-24">
              <h2 className="text-neon-green font-orbitron text-xl font-bold mb-4">
                Resumen del Pedido
              </h2>

              {/* Cupón de descuento */}
              <div className="mb-4">
                <label className="block text-gray-300 font-inter mb-2">¿Tienes un cupón de descuento?</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={codigoCupon}
                    onChange={(e) => setCodigoCupon(e.target.value)}
                    placeholder="Ingresa tu cupón"
                    className="flex-1 bg-dark-bg border border-neon-green/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-neon-green font-inter"
                  />
                  <button
                    onClick={handleAplicarCupon}
                    className="bg-neon-green text-dark-bg px-4 py-2 rounded-lg font-inter font-bold hover:bg-neon-green/80 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {mensajeCupon.texto && (
                  <p className={`mt-2 text-sm font-inter ${
                    mensajeCupon.tipo === 'exito' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {mensajeCupon.texto}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-300 font-inter">
                  <span>Subtotal</span>
                  <span>S/{getCartTotal().toFixed(2)}</span>
                </div>
                {cuponAplicado && (
                  <div className="flex justify-between text-green-400 font-inter">
                    <span>Descuento ({cuponAplicado.codigo})</span>
                    <span>-S/{calcularDescuento().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300 font-inter">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <hr className="border-neon-green/30" />
                <div className="flex justify-between text-neon-green font-orbitron font-bold text-xl">
                  <span>Total</span>
                  <span>S/{getTotalConDescuento().toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => setPaso('pago')}
                className="w-full bg-neon-green text-dark-bg px-6 py-3 rounded-lg font-orbitron font-bold mt-6 hover:bg-neon-green/80 transition-colors"
              >
                Ir a Pago
              </button>
              <button
                onClick={clearCart}
                className="w-full border border-red-400 text-red-400 px-6 py-2 rounded-lg font-inter mt-3 hover:bg-red-400/10 transition-colors"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
