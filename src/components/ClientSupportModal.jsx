
import React, { useState, useContext } from 'react';
import { SoporteContext } from '../context/SoporteContext';
import { AuthContext } from '../context/AuthContext';
import { PedidosContext } from '../context/PedidosContext';

const ClientSupportModal = ({ isOpen, onClose }) => {
  const { faqs, tickets, crearTicket, agregarMensaje, asignarCalificacion } = useContext(SoporteContext);
  const { usuario } = useContext(AuthContext);
  const { pedidos } = useContext(PedidosContext);

  const [activeTab, setActiveTab] = useState('faq');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newTicketForm, setNewTicketForm] = useState({
    asunto: '',
    motivo: 'Consulta general',
    pedidoId: null,
    mensaje: ''
  });
  const [newMessage, setNewMessage] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);

  if (!isOpen) return null;

  const userTickets = tickets.filter(ticket => ticket.clienteId === usuario?.id);
  const userPedidos = pedidos.filter(pedido => pedido.clienteId === usuario?.id);
  const categories = [...new Set(faqs.map(faq => faq.categoria))];

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicketForm.asunto || !newTicketForm.mensaje) return;
    crearTicket({
      ...newTicketForm,
      clienteId: usuario?.id,
      clienteNombre: usuario?.nombre,
      estado: 'Abierto',
      prioridad: 'Media',
      fechaCreacion: new Date().toISOString(),
      mensajes: [
        { autor: 'cliente', texto: newTicketForm.mensaje, fecha: new Date().toISOString() }
      ]
    });
    setActiveTab('tickets');
    setNewTicketForm({
      asunto: '',
      motivo: 'Consulta general',
      pedidoId: null,
      mensaje: ''
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;
    agregarMensaje(selectedTicket.id, 'cliente', newMessage);
    setNewMessage('');
  };

  const handleRateTicket = (ticketId, rating) => {
    asignarCalificacion(ticketId, rating);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center bg-black/60">
      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-t-lg md:rounded-lg w-full md:max-w-2xl md:h-[80vh] h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#39ff14]/30 p-4">
          <h2 className="text-[#39ff14] font-['orbitron'] text-xl font-bold">🎧 Atención al Cliente</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>

        <div className="flex border-b border-[#39ff14]/30">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-3 text-center font-['inter'] transition-colors ${activeTab === 'faq' ? 'text-[#39ff14] border-b-2 border-[#39ff14]' : 'text-gray-400 hover:text-white'}`}
          >
            Preguntas Frecuentes
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-3 text-center font-['inter'] transition-colors ${activeTab === 'tickets' ? 'text-[#39ff14] border-b-2 border-[#39ff14]' : 'text-gray-400 hover:text-white'}`}
          >
            Mis Tickets
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {categories.map(categoria => {
                const faqsCategoria = faqs.filter(faq => faq.categoria === categoria);
                return (
                  <div key={categoria} className="border border-[#39ff14]/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === categoria ? null : categoria)}
                      className="w-full text-left p-3 bg-[#39ff14]/10 flex justify-between items-center font-['inter'] text-white"
                    >
                      {categoria}
                      <span className="text-[#39ff14]">{expandedCategory === categoria ? '▲' : '▼'}</span>
                    </button>
                    {expandedCategory === categoria && (
                      <div className="p-3 space-y-3">
                        {faqsCategoria.map(faq => (
                          <div key={faq.id} className="space-y-1">
                            <h4 className="text-[#39ff14] font-['inter'] font-medium">{faq.pregunta}</h4>
                            <p className="text-gray-400 font-['inter'] text-sm">{faq.respuesta}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-4">
              {!selectedTicket ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedTicket('new')}
                    className="w-full bg-[#39ff14] text-[#0a0a0a] py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80"
                  >
                    + Nuevo Ticket
                  </button>
                  <div className="space-y-2">
                    {userTickets.map(ticket => (
                      <div
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        className="border border-[#39ff14]/30 rounded-lg p-3 cursor-pointer hover:border-[#39ff14]"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="text-white font-['inter'] font-medium">{ticket.asunto}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-['inter'] ${
                            ticket.estado === 'Abierto' ? 'bg-blue-400/20 text-blue-400' :
                            ticket.estado === 'En proceso' ? 'bg-yellow-400/20 text-yellow-400' :
                            ticket.estado === 'Resuelto' ? 'bg-green-400/20 text-green-400' :
                            'bg-gray-400/20 text-gray-400'
                          }`}>
                            {ticket.estado}
                          </span>
                        </div>
                        <p className="text-gray-500 font-['inter'] text-sm">{new Date(ticket.fechaCreacion).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedTicket === 'new' ? (
                    <div>
                      <div className="flex items-center mb-4">
                        <button
                          onClick={() => setSelectedTicket(null)}
                          className="text-gray-400 hover:text-white mr-3 text-lg"
                        >
                          ← Atrás
                        </button>
                        <h3 className="text-white font-['orbitron'] text-lg font-bold">Nuevo Ticket</h3>
                      </div>
                      <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div>
                          <label className="block text-gray-300 font-['inter'] mb-2">Asunto</label>
                          <input
                            type="text"
                            value={newTicketForm.asunto}
                            onChange={(e) => setNewTicketForm(prev => ({ ...prev, asunto: e.target.value }))}
                            className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-3 py-2 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-['inter'] mb-2">Motivo</label>
                          <select
                            value={newTicketForm.motivo}
                            onChange={(e) => setNewTicketForm(prev => ({ ...prev, motivo: e.target.value }))}
                            className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-3 py-2 rounded-lg"
                          >
                            <option value="Demora en entrega">Demora en entrega</option>
                            <option value="Producto dañado">Producto dañado</option>
                            <option value="No llegó el pedido">No llegó el pedido</option>
                            <option value="Solicitud de reembolso">Solicitud de reembolso</option>
                            <option value="Consulta general">Consulta general</option>
                            <option value="Problema con cupón">Problema con cupón</option>
                          </select>
                        </div>
                        {userPedidos.length > 0 && (
                          <div>
                            <label className="block text-gray-300 font-['inter'] mb-2">Pedido relacionado (opcional)</label>
                            <select
                              value={newTicketForm.pedidoId || ''}
                              onChange={(e) => setNewTicketForm(prev => ({ ...prev, pedidoId: e.target.value ? Number(e.target.value) : null }))}
                              className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-3 py-2 rounded-lg"
                            >
                              <option value="">Ninguno</option>
                              {userPedidos.map(pedido => (
                                <option key={pedido.id} value={pedido.id}>
                                  Pedido #{pedido.id} - ${pedido.total.toFixed(2)}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        <div>
                          <label className="block text-gray-300 font-['inter'] mb-2">Mensaje</label>
                          <textarea
                            value={newTicketForm.mensaje}
                            onChange={(e) => setNewTicketForm(prev => ({ ...prev, mensaje: e.target.value }))}
                            className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-3 py-2 rounded-lg"
                            rows={4}
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="flex-1 bg-[#39ff14] text-[#0a0a0a] py-2 rounded-lg font-['orbitron'] font-bold"
                          >
                            Enviar
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        <button
                          onClick={() => setSelectedTicket(null)}
                          className="text-gray-400 hover:text-white mr-3 text-lg"
                        >
                          ← Atrás
                        </button>
                        <div className="flex-1">
                          <h3 className="text-white font-['orbitron'] text-lg font-bold">{selectedTicket.asunto}</h3>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-['inter'] mt-1 ${
                            selectedTicket.estado === 'Abierto' ? 'bg-blue-400/20 text-blue-400' :
                            selectedTicket.estado === 'En proceso' ? 'bg-yellow-400/20 text-yellow-400' :
                            selectedTicket.estado === 'Resuelto' ? 'bg-green-400/20 text-green-400' :
                            'bg-gray-400/20 text-gray-400'
                          }`}>
                            {selectedTicket.estado}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-3 overflow-y-auto mb-3">
                        {selectedTicket.mensajes.map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.autor === 'cliente' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${
                              msg.autor === 'cliente' ? 'bg-[#39ff14]/20 text-white' : 'bg-gray-800 text-white'
                            }`}>
                              <p className="font-['inter']">{msg.texto}</p>
                              <p className="text-gray-500 font-['inter'] text-xs mt-1">{new Date(msg.fecha).toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {selectedTicket.estado === 'Resuelto' && !selectedTicket.calificacionCliente && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-3">
                          <p className="text-yellow-400 font-['inter'] mb-2">¿Cómo calificarías tu experiencia?</p>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(rating => (
                              <button
                                key={rating}
                                onClick={() => handleRateTicket(selectedTicket.id, rating)}
                                className="text-2xl hover:scale-110 transition-transform"
                              >
                                {rating} ⭐
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedTicket.estado !== 'Cerrado' && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            className="flex-1 bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-3 py-2 rounded-lg"
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          <button
                            onClick={handleSendMessage}
                            className="bg-[#39ff14] text-[#0a0a0a] px-4 py-2 rounded-lg font-['orbitron'] font-bold"
                          >
                            Enviar
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientSupportModal;
