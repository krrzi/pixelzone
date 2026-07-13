import React, { useState, useContext } from 'react';
import { MarketingContext } from '../../context/MarketingContext';

const GestionCupones = () => {
  const { cupones, crearCupon, editarCupon, desactivarCupon } = useContext(MarketingContext);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cuponEditando, setCuponEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    codigo: '',
    tipo: 'porcentaje',
    valor: '',
    fechaVencimiento: '',
    vecesDisponibles: '',
    descripcion: ''
  });

  const generarCodigoAleatorio = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 8; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormulario(prev => ({ ...prev, codigo }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formulario.codigo || !formulario.valor || !formulario.fechaVencimiento || !formulario.vecesDisponibles) {
      alert('Por favor, completa todos los campos');
      return;
    }
    if (cuponEditando) {
      editarCupon(cuponEditando.id, formulario);
    } else {
      if (cupones.find(c => c.codigo.toUpperCase() === formulario.codigo.toUpperCase())) {
        alert('El código del cupón ya existe');
        return;
      }
      crearCupon({
        ...formulario,
        valor: parseFloat(formulario.valor),
        vecesDisponibles: parseInt(formulario.vecesDisponibles),
        estado: 'activo',
        vecesUsado: 0
      });
    }
    setModalAbierto(false);
    setCuponEditando(null);
    setFormulario({ codigo: '', tipo: 'porcentaje', valor: '', fechaVencimiento: '', vecesDisponibles: '', descripcion: '' });
  };

  const handleEditar = (cupon) => {
    setCuponEditando(cupon);
    setFormulario(cupon);
    setModalAbierto(true);
  };

  const getBadgeColor = (estado) => {
    switch (estado) {
      case 'activo': return 'bg-green-400/20 text-green-400';
      case 'vencido': return 'bg-red-400/20 text-red-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">Gestión de Cupones</h1>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-[#39ff14] text-[#0a0a0a] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
        >
          Crear Cupón
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#39ff14]/30">
                <th className="text-gray-400 font-['inter'] py-4 px-6">Código</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Tipo</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Valor</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Fecha Vencimiento</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Usados / Disponibles</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Estado</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cupones.map((cupon) => (
                <tr key={cupon.id} className="border-b border-[#39ff14]/20">
                  <td className="text-white font-['inter'] py-4 px-6">{cupon.codigo}</td>
                  <td className="text-white font-['inter'] py-4 px-6">{cupon.tipo}</td>
                  <td className="text-[#39ff14] font-['orbitron'] py-4 px-6">
                    {cupon.tipo === 'porcentaje' ? `${cupon.valor}%` : `S/${cupon.valor.toFixed(2)}`}
                  </td>
                  <td className="text-white font-['inter'] py-4 px-6">{cupon.fechaVencimiento}</td>
                  <td className="text-white font-['inter'] py-4 px-6">{cupon.vecesUsado} / {cupon.vecesDisponibles}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-['inter'] ${getBadgeColor(cupon.estado)}`}>{cupon.estado}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleEditar(cupon)}
                      className="text-[#39ff14] hover:text-white font-['inter'] mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => desactivarCupon(cupon.id)}
                      className="text-gray-400 hover:text-white font-['inter']"
                    >
                      {cupon.estado === 'activo' ? 'Desactivar' : 'Activar'}
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
          <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-[#39ff14] font-['orbitron'] text-2xl font-bold mb-6">
              {cuponEditando ? 'Editar Cupón' : 'Crear Cupón'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Código</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formulario.codigo}
                    onChange={(e) => setFormulario(prev => ({ ...prev, codigo: e.target.value.toUpperCase() }))}
                    className="flex-1 bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                    placeholder="CODIGO123"
                  />
                  <button
                    type="button"
                    onClick={generarCodigoAleatorio}
                    className="border border-[#39ff14] text-[#39ff14] px-4 py-2 rounded-lg font-['inter'] hover:bg-[#39ff14]/10"
                  >
                    Generar
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Tipo</label>
                <select
                  value={formulario.tipo}
                  onChange={(e) => setFormulario(prev => ({ ...prev, tipo: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                >
                  <option value="porcentaje">Porcentaje</option>
                  <option value="monto_fijo">Monto Fijo</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Valor</label>
                <input
                  type="number"
                  value={formulario.valor}
                  onChange={(e) => setFormulario(prev => ({ ...prev, valor: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="10 o 50"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Fecha Vencimiento</label>
                <input
                  type="date"
                  value={formulario.fechaVencimiento}
                  onChange={(e) => setFormulario(prev => ({ ...prev, fechaVencimiento: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Cantidad Disponible</label>
                <input
                  type="number"
                  value={formulario.vecesDisponibles}
                  onChange={(e) => setFormulario(prev => ({ ...prev, vecesDisponibles: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Descripción</label>
                <textarea
                  value={formulario.descripcion}
                  onChange={(e) => setFormulario(prev => ({ ...prev, descripcion: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="Descripción del cupón"
                />
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
                    setCuponEditando(null);
                    setFormulario({ codigo: '', tipo: 'porcentaje', valor: '', fechaVencimiento: '', vecesDisponibles: '', descripcion: '' });
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
    </div>
  );
};

export default GestionCupones;
