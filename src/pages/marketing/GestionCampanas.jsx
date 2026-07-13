import React, { useState, useContext } from 'react';
import { MarketingContext } from '../../context/MarketingContext';

const GestionCampanas = () => {
  const { campanas, crearCampana, editarCampana, toggleCampana } = useContext(MarketingContext);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [campanaEditando, setCampanaEditando] = useState(null);
  const [campanaDetalle, setCampanaDetalle] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    canal: 'Redes Sociales',
    estado: 'Activa',
    fechaInicio: '',
    fechaFin: '',
    alcanceEstimado: '',
    conversiones: 0,
    presupuesto: '',
    gastado: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formulario.nombre || !formulario.fechaInicio || !formulario.fechaFin || !formulario.alcanceEstimado || !formulario.presupuesto) {
      alert('Por favor, completa todos los campos');
      return;
    }
    if (campanaEditando) {
      editarCampana(campanaEditando.id, formulario);
    } else {
      crearCampana({
        ...formulario,
        alcanceEstimado: parseInt(formulario.alcanceEstimado),
        presupuesto: parseFloat(formulario.presupuesto),
        gastado: parseFloat(formulario.gastado),
        conversiones: parseInt(formulario.conversiones)
      });
    }
    setModalAbierto(false);
    setCampanaEditando(null);
    setFormulario({
      nombre: '',
      canal: 'Redes Sociales',
      estado: 'Activa',
      fechaInicio: '',
      fechaFin: '',
      alcanceEstimado: '',
      conversiones: 0,
      presupuesto: '',
      gastado: 0
    });
  };

  const handleEditar = (campana) => {
    setCampanaEditando(campana);
    setFormulario(campana);
    setModalAbierto(true);
  };

  const handleVerDetalle = (campana) => {
    setCampanaDetalle(campana);
    setModalDetalleAbierto(true);
  };

  const getCanalIcono = (canal) => {
    switch (canal) {
      case 'Email': return '📧';
      case 'Redes Sociales': return '📱';
      case 'Web': return '🌐';
      case 'Push': return '🔔';
      default: return '';
    }
  };

  const getBadgeColor = (estado) => {
    switch (estado) {
      case 'Activa': return 'bg-green-400/20 text-green-400';
      case 'Pausada': return 'bg-yellow-400/20 text-yellow-400';
      case 'Finalizada': return 'bg-gray-400/20 text-gray-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  const getPorcentajeGastado = (presupuesto, gastado) => {
    if (presupuesto === 0) return 0;
    return Math.min((gastado / presupuesto) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">Gestión de Campañas</h1>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-[#39ff14] text-[#0a0a0a] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
        >
          Nueva Campaña
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#39ff14]/30">
                <th className="text-gray-400 font-['inter'] py-4 px-6">Nombre</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Canal</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Estado</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Fechas</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Alcance Estimado</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Conversiones</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Presupuesto vs Gastado</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {campanas.map((campana) => (
                <tr key={campana.id} className="border-b border-[#39ff14]/20">
                  <td className="text-white font-['inter'] py-4 px-6">{campana.nombre}</td>
                  <td className="text-white font-['inter'] py-4 px-6">{getCanalIcono(campana.canal)} {campana.canal}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-['inter'] ${getBadgeColor(campana.estado)}`}>{campana.estado}</span>
                  </td>
                  <td className="text-white font-['inter'] py-4 px-6">{campana.fechaInicio} - {campana.fechaFin}</td>
                  <td className="text-white font-['inter'] py-4 px-6">{campana.alcanceEstimado}</td>
                  <td className="text-[#39ff14] font-['orbitron'] py-4 px-6">{campana.conversiones}</td>
                  <td className="py-4 px-6">
                    <div className="mb-1 text-white font-['inter'] text-sm">
                      S/{campana.gastado.toFixed(2)} / S/{campana.presupuesto.toFixed(2)}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#39ff14] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getPorcentajeGastado(campana.presupuesto, campana.gastado)}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleEditar(campana)}
                      className="text-[#39ff14] hover:text-white font-['inter'] mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => toggleCampana(campana.id)}
                      className="text-yellow-400 hover:text-white font-['inter'] mr-3"
                    >
                      {campana.estado === 'Activa' ? 'Pausar' : 'Activar'}
                    </button>
                    <button
                      onClick={() => handleVerDetalle(campana)}
                      className="text-blue-400 hover:text-white font-['inter']"
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-[#39ff14] font-['orbitron'] text-2xl font-bold mb-6">
              {campanaEditando ? 'Editar Campaña' : 'Nueva Campaña'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Nombre</label>
                <input
                  type="text"
                  value={formulario.nombre}
                  onChange={(e) => setFormulario(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="Nombre de la campaña"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Canal</label>
                <select
                  value={formulario.canal}
                  onChange={(e) => setFormulario(prev => ({ ...prev, canal: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                >
                  <option value="Email">Email</option>
                  <option value="Redes Sociales">Redes Sociales</option>
                  <option value="Web">Web</option>
                  <option value="Push">Push</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-['inter'] mb-2">Fecha Inicio</label>
                  <input
                    type="date"
                    value={formulario.fechaInicio}
                    onChange={(e) => setFormulario(prev => ({ ...prev, fechaInicio: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-['inter'] mb-2">Fecha Fin</label>
                  <input
                    type="date"
                    value={formulario.fechaFin}
                    onChange={(e) => setFormulario(prev => ({ ...prev, fechaFin: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-['inter'] mb-2">Alcance Estimado</label>
                  <input
                    type="number"
                    value={formulario.alcanceEstimado}
                    onChange={(e) => setFormulario(prev => ({ ...prev, alcanceEstimado: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-['inter'] mb-2">Conversiones</label>
                  <input
                    type="number"
                    value={formulario.conversiones}
                    onChange={(e) => setFormulario(prev => ({ ...prev, conversiones: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-['inter'] mb-2">Presupuesto</label>
                  <input
                    type="number"
                    value={formulario.presupuesto}
                    onChange={(e) => setFormulario(prev => ({ ...prev, presupuesto: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-['inter'] mb-2">Gastado</label>
                  <input
                    type="number"
                    value={formulario.gastado}
                    onChange={(e) => setFormulario(prev => ({ ...prev, gastado: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-[#39ff14] text-[#0a0a0a] px-4 py-2 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalAbierto(false);
                    setCampanaEditando(null);
                    setFormulario({
                      nombre: '',
                      canal: 'Redes Sociales',
                      estado: 'Activa',
                      fechaInicio: '',
                      fechaFin: '',
                      alcanceEstimado: '',
                      conversiones: 0,
                      presupuesto: '',
                      gastado: 0
                    });
                  }}
                  className="flex-1 border border-[#39ff14] text-[#39ff14] px-4 py-2 rounded-lg font-['inter'] hover:bg-[#39ff14]/10 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalDetalleAbierto && campanaDetalle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-[#39ff14] font-['orbitron'] text-2xl font-bold mb-6">
              Detalle de Campaña
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 font-['inter'] text-sm">Nombre</p>
                <p className="text-white font-['inter']">{campanaDetalle.nombre}</p>
              </div>
              <div>
                <p className="text-gray-400 font-['inter'] text-sm">Canal</p>
                <p className="text-white font-['inter']">{getCanalIcono(campanaDetalle.canal)} {campanaDetalle.canal}</p>
              </div>
              <div>
                <p className="text-gray-400 font-['inter'] text-sm">Estado</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-['inter'] ${getBadgeColor(campanaDetalle.estado)}`}>{campanaDetalle.estado}</span>
              </div>
              <div>
                <p className="text-gray-400 font-['inter'] text-sm">Fechas</p>
                <p className="text-white font-['inter']">{campanaDetalle.fechaInicio} - {campanaDetalle.fechaFin}</p>
              </div>
              <div>
                <p className="text-gray-400 font-['inter'] text-sm">Alcance Estimado</p>
                <p className="text-white font-['inter']">{campanaDetalle.alcanceEstimado}</p>
              </div>
              <div>
                <p className="text-gray-400 font-['inter'] text-sm">Conversiones</p>
                <p className="text-[#39ff14] font-['orbitron']">{campanaDetalle.conversiones}</p>
              </div>
              <div>
                <p className="text-gray-400 font-['inter'] text-sm">Presupuesto vs Gastado</p>
                <div className="mt-1 text-white font-['inter']">
                  S/{campanaDetalle.gastado.toFixed(2)} / S/{campanaDetalle.presupuesto.toFixed(2)}
                </div>
                <div className="mt-1 w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#39ff14] h-2 rounded-full"
                    style={{ width: `${getPorcentajeGastado(campanaDetalle.presupuesto, campanaDetalle.gastado)}%` }}
                  />
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setModalDetalleAbierto(false);
                    setCampanaDetalle(null);
                  }}
                  className="w-full border border-[#39ff14] text-[#39ff14] px-4 py-2 rounded-lg font-['inter'] hover:bg-[#39ff14]/10 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionCampanas;
