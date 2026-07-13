
import React, { useState, useContext } from 'react';
import { SoporteContext } from '../../context/SoporteContext';
import { PedidosContext } from '../../context/PedidosContext';
import { LogisticaContext } from '../../context/LogisticaContext';

const BandejaTickets = () => {
  const { tickets, agregarMensaje, cambiarEstadoTicket, cambiarPrioridad, generarCuponCompensacion } = useContext(SoporteContext);
  const { pedidos } = useContext(PedidosContext);
  const { envios } = useContext(LogisticaContext);

  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroMotivo, setFiltroMotivo] = useState('');
  const [filtroPrioridad, setFiltroPrioridad] = useState('');

  const ticketsFiltrados = tickets.filter(ticket => {
    const cumpleEstado = !filtroEstado || ticket.estado === filtroEstado;
    const cumpleMotivo = !filtroMotivo || ticket.motivo === filtroMotivo;
    const cumplePrioridad = !filtroPrioridad || ticket.prioridad === filtroPrioridad;
    return cumpleEstado && cumpleMotivo && cumplePrioridad;
  });

  const getBadgeColorEstado = (estado) => {
    switch (estado) {
      case 'Abierto': return 'bg-blue-500/20 text-blue-400';
      case 'En proceso': return 'bg-yellow-500/20 text-yellow-400';
      case 'Resuelto': return 'bg-green-500/20 text-green-400';
      case 'Cerrado': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getBadgeColorPrioridad = (prioridad) => {
    switch (prioridad) {
      case 'Alta': return 'bg-red-500/20 text-red-400';
      case 'Media': return 'bg-yellow-500/20 text-yellow-400';
      case 'Baja': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim()) return;
    agregarMensaje(ticketSeleccionado.id, 'soporte', nuevoMensaje);
    setNuevoMensaje('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        Bandeja de Tickets
      </h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
        >
          <option value="">Todos los Estados</option>
          <option value="Abierto">Abierto</option>
          <option value="En proceso">En proceso</option>
          <option value="Resuelto">Resuelto</option>
          <option value="Cerrado">Cerrado</option>
        </select>

        <select
          value={filtroMotivo}
          onChange={(e) => setFiltroMotivo(e.target.value)}
          className="bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
        >
          <option value="">Todos los Motivos</option>
          <option value="Demora en entrega">Demora en entrega</option>
          <option value="Producto dañado">Producto dañado</option>
          <option value="No llegó el pedido">No llegó el pedido</option>
          <option value="Solicitud de reembolso">Solicitud de reembolso</option>
          <option value="Consulta general">Consulta general</option>
          <option value="Problema con cupón">Problema con cupón</option>
        </select>

        <select
          value={filtroPrioridad}
          onChange={(e) => setFiltroPrioridad(e.target.value)}
          className="bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
        >
          <option value="">Todas las Prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de tickets */}
        <div className="lg:col-span-1 bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-4 max-h-[600px] overflow-y-auto">
          {ticketsFiltrados.map(ticket => (
            <div
              key={ticket.id}
              onClick={() => setTicketSeleccionado(ticket)}
              className={`p-4 border-b border-[#39ff14]/20 cursor-pointer ${ticketSeleccionado?.id === ticket.id ? 'border-[#39ff14]' : ''}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-['inter'] font-medium">{ticket.asunto}</span>
              </div>
              <div className="flex gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-['inter'] ${getBadgeColorEstado(ticket.estado)}`}>
                  {ticket.estado}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-['inter'] ${getBadgeColorPrioridad(ticket.prioridad)}`}>
                  {ticket.prioridad}
                </span>
              </div>
              <p className="text-gray-400 font-['inter'] text-sm">{ticket.clienteNombre}</p>
              <p className="text-gray-500 font-['inter'] text-xs">{new Date(ticket.fechaCreacion).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {/* Detalle del ticket */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          {ticketSeleccionado ? (
            <>
              <div className="mb-6">
                <h2 className="text-[#39ff14] font-['orbitron'] text-2xl font-bold mb-4">{ticketSeleccionado.asunto}</h2>
                <p className="text-gray-400 font-['inter'] mb-2">Cliente: {ticketSeleccionado.clienteNombre}</p>
                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-['inter'] ${getBadgeColorEstado(ticketSeleccionado.estado)}`}>
                    {ticketSeleccionado.estado}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-['inter'] ${getBadgeColorPrioridad(ticketSeleccionado.prioridad)}`}>
                    {ticketSeleccionado.prioridad}
                  </span>
                </div>

                {/* Pedido/Envío vinculado */}
                {ticketSeleccionado.pedidoId && (
                  <div className="mb-4 p-4 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-lg">
                    <h3 className="text-white font-['orbitron'] font-bold mb-2">Pedido Vinculado</h3>
                    <p className="text-gray-400 font-['inter']">Pedido #{ticketSeleccionado.pedidoId}</p>
                    {pedidos.find(p => p.id === ticketSeleccionado.pedidoId) && (
                      <p className="text-gray-300 font-['inter'] text-sm mt-1">
                        Total: S/{pedidos.find(p => p.id === ticketSeleccionado.pedidoId).total}
                      </p>
                    )}
                  </div>
                )}

                {/* Controles de estado y prioridad */}
                <div className="flex gap-4 mb-6 flex-wrap">
                  <select
                    value={ticketSeleccionado.estado}
                    onChange={(e) => cambiarEstadoTicket(ticketSeleccionado.id, e.target.value)}
                    className="bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  >
                    <option value="Abierto">Abierto</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Resuelto">Resuelto</option>
                    <option value="Cerrado">Cerrado</option>
                  </select>

                  <select
                    value={ticketSeleccionado.prioridad}
                    onChange={(e) => cambiarPrioridad(ticketSeleccionado.id, e.target.value)}
                    className="bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>

                  {!ticketSeleccionado.compensacionAplicada && (
                    <button
                      onClick={() => generarCuponCompensacion(ticketSeleccionado.id)}
                      className="bg-[#39ff14] text-[#0a0a0a] px-4 py-2 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
                    >
                      Generar Cupón Compensación
                    </button>
                  )}

                  {ticketSeleccionado.compensacionAplicada && (
                    <span className="text-green-400 font-['inter'] px-4 py-2">Cupón de compensación aplicado</span>
                  )}
                </div>

                {/* Historial de mensajes */}
                <div className="mb-6 max-h-[300px] overflow-y-auto border border-[#39ff14]/30 rounded-lg p-4 bg-[#1a1a1a]">
                  {ticketSeleccionado.mensajes.map((msg, idx) => (
                    <div key={idx} className={`mb-4 ${msg.autor === 'soporte' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-3 rounded-lg ${msg.autor === 'soporte' ? 'bg-[#39ff14]/20 text-white' : 'bg-gray-700 text-white'}`}>
                        <p className="font-['inter']">{msg.texto}</p>
                        <p className="text-gray-400 font-['inter'] text-xs mt-1">{new Date(msg.fecha).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enviar mensaje */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  />
                  <button
                    onClick={enviarMensaje}
                    className="bg-[#39ff14] text-[#0a0a0a] px-4 py-2 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 font-['inter'] py-20">
              Selecciona un ticket para ver su detalle
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BandejaTickets;
