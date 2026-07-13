
import React, { useState, useContext } from 'react';
import { LogisticaContext } from '../../context/LogisticaContext';

const GestionEnvios = () => {
  const { envios, couriers, asignarCourier, actualizarEstadoEnvio, registrarIncidencia } = useContext(LogisticaContext);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroCourier, setFiltroCourier] = useState('');
  const [modalHistorial, setModalHistorial] = useState(null);
  const [modalIncidencia, setModalIncidencia] = useState(null);
  const [motivoIncidencia, setMotivoIncidencia] = useState('');
  const [modalAsignarCourier, setModalAsignarCourier] = useState(null);
  const [selectedCourierId, setSelectedCourierId] = useState(null);

  const enviosFiltrados = envios.filter(envio => {
    const cumpleEstado = !filtroEstado || envio.estado === filtroEstado;
    const cumpleCourier = !filtroCourier || envio.courierId === parseInt(filtroCourier);
    return cumpleEstado && cumpleCourier;
  });

  const getBadgeColor = (estado) => {
    switch (estado) {
      case 'Pendiente': return 'bg-gray-500/20 text-gray-400';
      case 'En preparación': return 'bg-blue-500/20 text-blue-400';
      case 'En camino': return 'bg-yellow-500/20 text-yellow-400';
      case 'Entregado': return 'bg-green-500/20 text-green-400';
      case 'Incidencia':
      case 'Devuelto':
        return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCourierName = (courierId) => {
    const courier = couriers.find(c => c.id === courierId);
    return courier ? `${courier.nombre} (${courier.empresa})` : 'No asignado';
  };

  const handleAsignarCourier = () => {
    if (selectedCourierId && modalAsignarCourier) {
      asignarCourier(modalAsignarCourier.id, selectedCourierId);
      setModalAsignarCourier(null);
      setSelectedCourierId(null);
    }
  };

  const handleRegistrarIncidencia = () => {
    if (motivoIncidencia && modalIncidencia) {
      registrarIncidencia(modalIncidencia.id, motivoIncidencia);
      setModalIncidencia(null);
      setMotivoIncidencia('');
    }
  };

  const estadosValidos = ['Pendiente', 'En preparación', 'En camino', 'Entregado', 'Devuelto'];

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">Gestión de Envíos</h1>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
        >
          <option value="">Todos los estados</option>
          {estadosValidos.map(estado => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
          <option value="Incidencia">Incidencia</option>
          <option value="Devuelto">Devuelto</option>
        </select>

        <select
          value={filtroCourier}
          onChange={(e) => setFiltroCourier(e.target.value)}
          className="bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
        >
          <option value="">Todos los couriers</option>
          {couriers.map(courier => (
            <option key={courier.id} value={courier.id}>{courier.nombre} ({courier.empresa})</option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#39ff14]/30">
                <th className="text-gray-400 font-['inter'] py-4 px-6">Pedido</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Cliente</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Courier</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Distrito</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Estado</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Fecha Estimada</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {enviosFiltrados.map(envio => (
              <tr key={envio.id} className="border-b border-[#39ff14]/20">
                <td className="text-white font-['inter'] py-4 px-6">#{envio.pedidoId}</td>
                <td className="text-white font-['inter'] py-4 px-6">{envio.clienteNombre}</td>
                <td className="text-white font-['inter'] py-4 px-6">{getCourierName(envio.courierId)}</td>
                <td className="text-white font-['inter'] py-4 px-6">{envio.distrito}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-['inter'] ${getBadgeColor(envio.estado)}`}>{envio.estado}</span>
                </td>
                <td className="text-white font-['inter'] py-4 px-6">{envio.fechaEstimada}</td>
                <td className="py-4 px-6">
                  <div className="flex gap-2 flex-wrap">
                    <select
                      value={envio.estado}
                      onChange={(e) => actualizarEstadoEnvio(envio.id, e.target.value)}
                      className="bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-2 py-1 rounded text-sm font-['inter']"
                    >
                      {estadosValidos.map(estado => (
                        <option key={estado} value={estado}>{estado}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setModalAsignarCourier(envio)}
                      className="text-[#39ff14] hover:text-white font-['inter'] text-sm"
                    >
                      Asignar Courier
                    </button>
                    <button
                      onClick={() => setModalHistorial(envio)}
                      className="text-blue-400 hover:text-white font-['inter'] text-sm"
                    >
                      Ver Historial
                    </button>
                    <button
                      onClick={() => setModalIncidencia(envio)}
                      className="text-red-400 hover:text-white font-['inter'] text-sm"
                    >
                      Reportar Incidencia
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Historial */}
      {modalHistorial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-[#39ff14] font-['orbitron'] text-2xl font-bold mb-6">
              Historial de Estado
            </h2>
            <div className="space-y-4">
              {modalHistorial.historialEstados.map((item, index) => (
                <div key={index} className="border-b border-[#39ff14]/20 pb-2">
                  <p className="text-gray-400 font-['inter'] text-sm">
                    {new Date(item.fecha).toLocaleString()}
                  </p>
                  <p className="text-white font-['inter']">{item.estado}</p>
                  {item.motivo && (
                    <p className="text-red-400 font-['inter'] text-sm mt-1">{item.motivo}</p>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setModalHistorial(null)}
              className="w-full border border-[#39ff14] text-[#39ff14] px-4 py-2 rounded-lg font-['inter'] mt-6 hover:bg-[#39ff14]/10 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal Incidencia */}
      {modalIncidencia && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-[#39ff14] font-['orbitron'] text-2xl font-bold mb-6">
              Reportar Incidencia
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Motivo de la incidencia</label>
                <textarea
                  value={motivoIncidencia}
                  onChange={(e) => setMotivoIncidencia(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="Describe la incidencia..."
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleRegistrarIncidencia}
                  className="flex-1 bg-[#39ff14] text-[#0a0a0a] px-4 py-2 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
                >
                  Reportar
                </button>
                <button
                  onClick={() => {
                    setModalIncidencia(null);
                    setMotivoIncidencia('');
                  }}
                  className="flex-1 border border-[#39ff14] text-[#39ff14] px-4 py-2 rounded-lg font-['inter'] hover:bg-[#39ff14]/10 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Asignar Courier */}
      {modalAsignarCourier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-[#39ff14] font-['orbitron'] text-2xl font-bold mb-6">
              Asignar Courier
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Seleccionar Courier</label>
                <select
                  value={selectedCourierId || ''}
                  onChange={(e) => setSelectedCourierId(parseInt(e.target.value))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                >
                  <option value="">Seleccionar...</option>
                  {couriers.filter(c => c.estado === 'activo').map(courier => (
                    <option key={courier.id} value={courier.id}>
                      {courier.nombre} ({courier.empresa}) - {courier.zonaCobertura.join(', ')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAsignarCourier}
                  className="flex-1 bg-[#39ff14] text-[#0a0a0a] px-4 py-2 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
                >
                  Asignar
                </button>
                <button
                  onClick={() => {
                    setModalAsignarCourier(null);
                    setSelectedCourierId(null);
                  }}
                  className="flex-1 border border-[#39ff14] text-[#39ff14] px-4 py-2 rounded-lg font-['inter'] hover:bg-[#39ff14]/10 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionEnvios;
