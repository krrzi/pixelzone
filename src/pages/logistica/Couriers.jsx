
import React, { useState, useContext } from 'react';
import { LogisticaContext } from '../../context/LogisticaContext';

const Couriers = () => {
  const { couriers, crearCourier, editarCourier, desactivarCourier } = useContext(LogisticaContext);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [courierEditando, setCourierEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    zonaCobertura: '',
    calificacion: 5,
    estado: 'activo'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const zonas = formulario.zonaCobertura.split(',').map(z => z.trim()).filter(z => z);
    
    if (!formulario.nombre || !formulario.empresa || !formulario.telefono || zonas.length === 0) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Validate telefono format (basic)
    const telefonoValido = /^\d{3}-\d{3}-\d{3}$/.test(formulario.telefono);
    if (!telefonoValido) {
      alert('Por favor, ingresa un teléfono válido (ej: 987-654-321)');
      return;
    }

    const datosCourier = {
      ...formulario,
      zonaCobertura: zonas
    };

    if (courierEditando) {
      editarCourier(courierEditando.id, datosCourier);
    } else {
      // Check for duplicate nombre
      if (couriers.find(c => c.nombre === formulario.nombre)) {
        alert('El nombre del courier ya existe');
        return;
      }
      crearCourier(datosCourier);
    }

    setModalAbierto(false);
    setCourierEditando(null);
    setFormulario({
      nombre: '',
      empresa: '',
      telefono: '',
      zonaCobertura: '',
      calificacion: 5,
      estado: 'activo'
    });
  };

  const handleEditar = (courier) => {
    setCourierEditando(courier);
    setFormulario({
      ...courier,
      zonaCobertura: courier.zonaCobertura.join(', ')
    });
    setModalAbierto(true);
  };

  const getBadgeColor = (estado) => {
    return estado === 'activo' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400';
  };

  const renderEstrellas = (calificacion) => {
    return '★'.repeat(Math.floor(calificacion)) + '☆'.repeat(5 - Math.floor(calificacion));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">Gestión de Couriers</h1>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-[#39ff14] text-[#0a0a0a] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
        >
          Nuevo Courier
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#39ff14]/30">
                <th className="text-gray-400 font-['inter'] py-4 px-6">Nombre</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Empresa</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Teléfono</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Zona de Cobertura</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Calificación</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Entregas Completadas</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Estado</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {couriers.map(courier => (
                <tr key={courier.id} className="border-b border-[#39ff14]/20">
                  <td className="text-white font-['inter'] py-4 px-6">{courier.nombre}</td>
                  <td className="text-white font-['inter'] py-4 px-6">{courier.empresa}</td>
                  <td className="text-white font-['inter'] py-4 px-6">{courier.telefono}</td>
                  <td className="text-white font-['inter'] py-4 px-6">{courier.zonaCobertura.join(', ')}</td>
                  <td className="text-[#39ff14] font-['orbitron'] py-4 px-6">{renderEstrellas(courier.calificacion)} ({courier.calificacion})</td>
                  <td className="text-white font-['inter'] py-4 px-6">{courier.entregasCompletadas}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-['inter'] ${getBadgeColor(courier.estado)}`}>{courier.estado}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleEditar(courier)}
                      className="text-[#39ff14] hover:text-white font-['inter'] mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => desactivarCourier(courier.id)}
                      className="text-gray-400 hover:text-white font-['inter']"
                    >
                      {courier.estado === 'activo' ? 'Desactivar' : 'Activar'}
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
              {courierEditando ? 'Editar Courier' : 'Nuevo Courier'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Nombre</label>
                <input
                  type="text"
                  value={formulario.nombre}
                  onChange={(e) => setFormulario(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="Nombre completo"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Empresa</label>
                <input
                  type="text"
                  value={formulario.empresa}
                  onChange={(e) => setFormulario(prev => ({ ...prev, empresa: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="Nombre de la empresa"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Teléfono (ej: 987-654-321)</label>
                <input
                  type="text"
                  value={formulario.telefono}
                  onChange={(e) => setFormulario(prev => ({ ...prev, telefono: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="987-654-321"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Zona de Cobertura (separado por comas)</label>
                <input
                  type="text"
                  value={formulario.zonaCobertura}
                  onChange={(e) => setFormulario(prev => ({ ...prev, zonaCobertura: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="Trujillo Centro, La Esperanza, El Porvenir"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Calificación (1-5)</label>
                <input
                  type="number"
                  value={formulario.calificacion}
                  onChange={(e) => setFormulario(prev => ({ ...prev, calificacion: parseFloat(e.target.value) }))}
                  min="1"
                  max="5"
                  step="0.1"
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
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
                    setCourierEditando(null);
                    setFormulario({
                      nombre: '',
                      empresa: '',
                      telefono: '',
                      zonaCobertura: '',
                      calificacion: 5,
                      estado: 'activo'
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
    </div>
  );
};

export default Couriers;
