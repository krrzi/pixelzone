import React, { useState, useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';

const ProductosAdmin = () => {
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useContext(ProductsContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    stock: '',
    descripcion: '',
    imagen: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productoEditar) {
      editarProducto(productoEditar.id, {
        ...formulario,
        precio: parseFloat(formulario.precio),
        stock: parseInt(formulario.stock)
      });
    } else {
      agregarProducto({
        ...formulario,
        precio: parseFloat(formulario.precio),
        stock: parseInt(formulario.stock)
      });
    }
    setMostrarFormulario(false);
    setProductoEditar(null);
    setFormulario({
      nombre: '',
      precio: '',
      categoria: '',
      stock: '',
      descripcion: '',
      imagen: '',
    });
  };

  const handleEditar = (producto) => {
    setProductoEditar(producto);
    setFormulario({
      nombre: producto.nombre,
      precio: producto.precio.toString(),
      categoria: producto.categoria,
      stock: producto.stock.toString(),
      descripcion: producto.descripcion,
      imagen: producto.imagen,
    });
    setMostrarFormulario(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      eliminarProducto(id);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-neon-green font-orbitron text-4xl font-bold">
            Gestionar Productos
          </h1>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-neon-green text-dark-bg px-6 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-green/80 transition-colors"
          >
            {mostrarFormulario ? 'Cancelar' : 'Añadir Producto'}
          </button>
        </div>

        {/* Formulario */}
        {mostrarFormulario && (
          <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 mb-8">
            <h2 className="text-neon-green font-orbitron text-xl font-bold mb-6">
              {productoEditar ? 'Editar Producto' : 'Añadir Nuevo Producto'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-inter mb-2">Nombre</label>
                <input
                  type="text"
                  value={formulario.nombre}
                  onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                  className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-2 rounded focus:outline-none focus:border-neon-green"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 font-inter mb-2">Precio</label>
                <input
                  type="number"
                  step="0.01"
                  value={formulario.precio}
                  onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })}
                  className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-2 rounded focus:outline-none focus:border-neon-green"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 font-inter mb-2">Categoría</label>
                <input
                  type="text"
                  value={formulario.categoria}
                  onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })}
                  className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-2 rounded focus:outline-none focus:border-neon-green"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 font-inter mb-2">Stock</label>
                <input
                  type="number"
                  value={formulario.stock}
                  onChange={(e) => setFormulario({ ...formulario, stock: e.target.value })}
                  className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-2 rounded focus:outline-none focus:border-neon-green"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 font-inter mb-2">Descripción</label>
                <textarea
                  value={formulario.descripcion}
                  onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
                  className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-2 rounded focus:outline-none focus:border-neon-green"
                  rows="3"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 font-inter mb-2">URL Imagen</label>
                <input
                  type="text"
                  value={formulario.imagen}
                  onChange={(e) => setFormulario({ ...formulario, imagen: e.target.value })}
                  className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-2 rounded focus:outline-none focus:border-neon-green"
                  placeholder="https://placehold.co/300x300?text=Producto"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-neon-green text-dark-bg px-6 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-green/80 transition-colors"
                >
                  {productoEditar ? 'Guardar Cambios' : 'Añadir Producto'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabla de Productos */}
        <div className="bg-dark-bg border border-neon-green/30 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neon-green/10">
                <tr>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Producto</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Categoría</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Precio</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Stock</th>
                  <th className="px-6 py-3 text-left text-neon-green font-orbitron">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neon-green/20">
                {productos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-neon-green/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-12 h-12 object-cover rounded mr-4"
                        />
                        <span className="text-white font-inter">{producto.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-inter">{producto.categoria}</td>
                    <td className="px-6 py-4 text-neon-green font-orbitron font-bold">
                      ${producto.precio.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-inter ${producto.stock < 5 ? 'text-red-400' : 'text-gray-300'}`}>
                        {producto.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditar(producto)}
                          className="text-blue-400 hover:text-blue-300 font-inter"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(producto.id)}
                          className="text-red-400 hover:text-red-300 font-inter"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosAdmin;
