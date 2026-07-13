
import React, { useState, useContext } from 'react';
import { SoporteContext } from '../../context/SoporteContext';

const BaseConocimiento = () => {
  const { faqs, crearFAQ, editarFAQ, eliminarFAQ } = useContext(SoporteContext);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [faqEditando, setFaqEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    pregunta: '',
    respuesta: '',
    categoria: 'Pedidos'
  });

  const categorias = ['Pedidos', 'Pagos', 'Envíos', 'Devoluciones', 'Cuenta'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formulario.pregunta || !formulario.respuesta) {
      alert('Por favor completa todos los campos');
      return;
    }
    if (faqEditando) {
      editarFAQ(faqEditando.id, formulario);
    } else {
      crearFAQ(formulario);
    }
    setModalAbierto(false);
    setFaqEditando(null);
    setFormulario({ pregunta: '', respuesta: '', categoria: 'Pedidos' });
  };

  const handleEditar = (faq) => {
    setFaqEditando(faq);
    setFormulario(faq);
    setModalAbierto(true);
  };

  const faqsAgrupadasPorCategoria = categorias.map(categoria => ({
    categoria,
    faqs: faqs.filter(f => f.categoria === categoria)
  }));

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">Base de Conocimiento</h1>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-[#39ff14] text-[#0a0a0a] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
        >
          Nueva Pregunta
        </button>
      </div>

      <div className="space-y-8">
        {faqsAgrupadasPorCategoria.map(({ categoria, faqs: faqsCategoria }) => (
          faqsCategoria.length > 0 && (
            <div key={categoria} className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
              <h2 className="text-[#39ff14] font-['orbitron'] text-xl font-bold mb-6">{categoria}</h2>
              <div className="space-y-4">
                {faqsCategoria.map(faq => (
                  <div key={faq.id} className="border-b border-[#39ff14]/20 pb-4">
                    <div className="flex justify-between items-start">
                      <p className="text-white font-['inter'] font-medium">{faq.pregunta}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditar(faq)}
                          className="text-[#39ff14] hover:text-white font-['inter'] text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => eliminarFAQ(faq.id)}
                          className="text-red-400 hover:text-red-300 font-['inter'] text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 font-['inter'] mt-2">{faq.respuesta}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Modal crear/editar FAQ */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-[#39ff14] font-['orbitron'] text-2xl font-bold mb-6">
              {faqEditando ? 'Editar Pregunta' : 'Nueva Pregunta'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Pregunta</label>
                <input
                  type="text"
                  value={formulario.pregunta}
                  onChange={(e) => setFormulario(prev => ({ ...prev, pregunta: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="Escribe la pregunta..."
                />
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Respuesta</label>
                <textarea
                  value={formulario.respuesta}
                  onChange={(e) => setFormulario(prev => ({ ...prev, respuesta: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                  placeholder="Escribe la respuesta..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-['inter'] mb-2">Categoría</label>
                <select
                  value={formulario.categoria}
                  onChange={(e) => setFormulario(prev => ({ ...prev, categoria: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#39ff14] font-['inter']"
                >
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
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
                    setFaqEditando(null);
                    setFormulario({ pregunta: '', respuesta: '', categoria: 'Pedidos' });
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

export default BaseConocimiento;
