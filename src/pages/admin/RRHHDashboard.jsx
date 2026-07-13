import React, { useContext, useState } from 'react';
import { RRHHContext } from '../../context/RRHHContext';

const RRHHDashboard = () => {
  const { empleados, agregarEmpleado, editarEmpleado, toggleEstadoEmpleado } = useContext(RRHHContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmpleado, setEditingEmpleado] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    cargo: '',
    area: '',
    fechaIngreso: '',
    salario: '',
    estado: 'Activo'
  });

  const totalEmpleados = empleados.length;
  const empleadosActivos = empleados.filter(emp => emp.estado === 'Activo').length;
  const areasUnicas = [...new Set(empleados.map(emp => emp.area))];
  const nominaTotal = empleados.reduce((sum, emp) => sum + emp.salario, 0);

  const getInitials = (nombre) => {
    return nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmpleado) {
      editarEmpleado(editingEmpleado.id, formData);
    } else {
      agregarEmpleado(formData);
    }
    setIsModalOpen(false);
    setEditingEmpleado(null);
    setFormData({
      nombre: '',
      dni: '',
      cargo: '',
      area: '',
      fechaIngreso: '',
      salario: '',
      estado: 'Activo'
    });
  };

  const handleEdit = (emp) => {
    setEditingEmpleado(emp);
    setFormData(emp);
    setIsModalOpen(true);
  };

  const areasResumen = areasUnicas.map(area => {
    const empleadosArea = empleados.filter(emp => emp.area === area);
    const totalSalarios = empleadosArea.reduce((sum, emp) => sum + emp.salario, 0);
    return { area, count: empleadosArea.length, salarios: totalSalarios };
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        RRHH - Recursos Humanos
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Total Empleados</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{totalEmpleados}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Empleados Activos</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{empleadosActivos}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Áreas</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">{areasUnicas.length}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h3 className="text-gray-400 font-['inter'] mb-2">Nómina Total</h3>
          <p className="text-[#39ff14] font-['orbitron'] text-3xl font-bold">S/{nominaTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Botón Agregar Empleado */}
      <div className="mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#39ff14] text-[#0a0a0a] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
        >
          Agregar Empleado
        </button>
      </div>

      {/* Tabla de Empleados */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6 mb-8 overflow-x-auto">
        <h2 className="text-white font-['orbitron'] text-xl mb-4">Listado de Empleados</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#39ff14]/30">
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Foto</th>
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Nombre</th>
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">DNI</th>
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Cargo</th>
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Área</th>
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Fecha Ingreso</th>
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Salario</th>
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Estado</th>
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(emp => (
              <tr key={emp.id} className="border-b border-gray-800">
                <td className="py-4 px-4">
                  <div className="w-10 h-10 rounded-full bg-[#39ff14]/20 flex items-center justify-center text-[#39ff14] font-['orbitron'] font-bold">
                    {getInitials(emp.nombre)}
                  </div>
                </td>
                <td className="py-4 px-4 text-white font-['inter']">{emp.nombre}</td>
                <td className="py-4 px-4 text-gray-300 font-['inter']">{emp.dni}</td>
                <td className="py-4 px-4 text-gray-300 font-['inter']">{emp.cargo}</td>
                <td className="py-4 px-4 text-gray-300 font-['inter']">{emp.area}</td>
                <td className="py-4 px-4 text-gray-300 font-['inter']">{emp.fechaIngreso}</td>
                <td className="py-4 px-4 text-[#39ff14] font-['inter']">S/{emp.salario.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-['inter'] font-bold ${
                      emp.estado === 'Activo'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {emp.estado}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded font-['inter'] text-sm hover:bg-blue-500/30 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => toggleEstadoEmpleado(emp.id)}
                      className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded font-['inter'] text-sm hover:bg-yellow-500/30 transition-colors"
                    >
                      {emp.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Organigrama */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6 mb-8">
        <h2 className="text-white font-['orbitron'] text-xl mb-4">Organigrama</h2>
        <div className="flex flex-col items-center">
          <div className="p-4 border-2 border-[#39ff14] rounded-lg bg-[#0a0a0a] text-center min-w-[200px]">
            <p className="text-[#39ff14] font-['orbitron'] font-bold">Carlos Mendoza</p>
            <p className="text-gray-400 font-['inter'] text-sm">CEO</p>
          </div>
          <div className="flex gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-[#39ff14]"></div>
              <div className="p-4 border-2 border-[#39ff14] rounded-lg bg-[#0a0a0a] text-center min-w-[180px]">
                <p className="text-[#39ff14] font-['orbitron'] font-bold">María Rodríguez</p>
                <p className="text-gray-400 font-['inter'] text-sm">Gerente de Tecnología</p>
              </div>
              <div className="flex gap-4 mt-6">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-8 bg-[#39ff14]"></div>
                  <div className="p-3 border border-[#39ff14]/50 rounded-lg bg-[#0a0a0a] text-center min-w-[150px]">
                    <p className="text-white font-['inter'] font-medium">José Flores</p>
                    <p className="text-gray-400 font-['inter'] text-xs">Dev Senior</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-8 bg-[#39ff14]"></div>
                  <div className="p-3 border border-[#39ff14]/50 rounded-lg bg-[#0a0a0a] text-center min-w-[150px]">
                    <p className="text-white font-['inter'] font-medium">Ana Torres</p>
                    <p className="text-gray-400 font-['inter'] text-xs">Dev Frontend</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-[#39ff14]"></div>
              <div className="p-4 border-2 border-[#39ff14] rounded-lg bg-[#0a0a0a] text-center min-w-[180px]">
                <p className="text-[#39ff14] font-['orbitron'] font-bold">Luis Gutiérrez</p>
                <p className="text-gray-400 font-['inter'] text-sm">Gerente de Marketing</p>
              </div>
              <div className="flex gap-4 mt-6">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-8 bg-[#39ff14]"></div>
                  <div className="p-3 border border-[#39ff14]/50 rounded-lg bg-[#0a0a0a] text-center min-w-[150px]">
                    <p className="text-white font-['inter'] font-medium">Valeria Campos</p>
                    <p className="text-gray-400 font-['inter'] text-xs">Especialista Marketing</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-[#39ff14]"></div>
              <div className="p-4 border-2 border-[#39ff14] rounded-lg bg-[#0a0a0a] text-center min-w-[180px]">
                <p className="text-[#39ff14] font-['orbitron'] font-bold">Pedro Rojas</p>
                <p className="text-gray-400 font-['inter'] text-sm">Gerente de Operaciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Nómina */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
        <h2 className="text-white font-['orbitron'] text-xl mb-4">Resumen de Nómina por Área</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#39ff14]/30">
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Área</th>
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Total Empleados</th>
              <th className="text-[#39ff14] font-['inter'] text-left py-3 px-4">Total Salarios</th>
            </tr>
          </thead>
          <tbody>
            {areasResumen.map((areaRes, idx) => (
              <tr key={idx} className="border-b border-gray-800">
                <td className="py-4 px-4 text-white font-['inter']">{areaRes.area}</td>
                <td className="py-4 px-4 text-gray-300 font-['inter']">{areaRes.count}</td>
                <td className="py-4 px-4 text-[#39ff14] font-['inter']">S/{areaRes.salarios.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="py-4 px-4 text-white font-['inter']">TOTAL</td>
              <td className="py-4 px-4 text-[#39ff14] font-['inter']">{totalEmpleados}</td>
              <td className="py-4 px-4 text-[#39ff14] font-['inter']">S/{nominaTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal de Agregar/Editar Empleado */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-[#39ff14] font-['orbitron'] text-2xl font-bold mb-6">
              {editingEmpleado ? 'Editar Empleado' : 'Agregar Empleado'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-400 font-['inter'] block mb-2">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#111] border border-[#39ff14]/30 rounded-lg px-4 py-2 text-white font-['inter'] focus:outline-none focus:border-[#39ff14]"
                />
              </div>
              <div>
                <label className="text-gray-400 font-['inter'] block mb-2">DNI</label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  required
                  maxLength={8}
                  className="w-full bg-[#111] border border-[#39ff14]/30 rounded-lg px-4 py-2 text-white font-['inter'] focus:outline-none focus:border-[#39ff14]"
                />
              </div>
              <div>
                <label className="text-gray-400 font-['inter'] block mb-2">Cargo</label>
                <input
                  type="text"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#111] border border-[#39ff14]/30 rounded-lg px-4 py-2 text-white font-['inter'] focus:outline-none focus:border-[#39ff14]"
                />
              </div>
              <div>
                <label className="text-gray-400 font-['inter'] block mb-2">Área</label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#111] border border-[#39ff14]/30 rounded-lg px-4 py-2 text-white font-['inter'] focus:outline-none focus:border-[#39ff14]"
                >
                  <option value="">Seleccionar área</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Logística">Logística</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Administración">Administración</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 font-['inter'] block mb-2">Fecha de Ingreso</label>
                <input
                  type="date"
                  name="fechaIngreso"
                  value={formData.fechaIngreso}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#111] border border-[#39ff14]/30 rounded-lg px-4 py-2 text-white font-['inter'] focus:outline-none focus:border-[#39ff14]"
                />
              </div>
              <div>
                <label className="text-gray-400 font-['inter'] block mb-2">Salario Mensual</label>
                <input
                  type="number"
                  name="salario"
                  value={formData.salario}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full bg-[#111] border border-[#39ff14]/30 rounded-lg px-4 py-2 text-white font-['inter'] focus:outline-none focus:border-[#39ff14]"
                />
              </div>
              {editingEmpleado && (
                <div>
                  <label className="text-gray-400 font-['inter'] block mb-2">Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-[#39ff14]/30 rounded-lg px-4 py-2 text-white font-['inter'] focus:outline-none focus:border-[#39ff14]"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              )}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingEmpleado(null);
                    setFormData({
                      nombre: '',
                      dni: '',
                      cargo: '',
                      area: '',
                      fechaIngreso: '',
                      salario: '',
                      estado: 'Activo'
                    });
                  }}
                  className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-['inter'] font-bold hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#39ff14] text-[#0a0a0a] px-6 py-3 rounded-lg font-['orbitron'] font-bold hover:bg-[#39ff14]/80 transition-colors"
                >
                  {editingEmpleado ? 'Guardar Cambios' : 'Agregar Empleado'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RRHHDashboard;
