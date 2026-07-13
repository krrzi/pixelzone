import React, { useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ProveedoresContext } from '../../context/ProveedoresContext';
import { ProductsContext } from '../../context/ProductsContext';

const MisProductos = () => {
  const { usuario } = useAuth();
  const { getProveedorByEmail, agregarOrden } = useContext(ProveedoresContext);
  const { productos } = useContext(ProductsContext);
  const proveedorLogueado = getProveedorByEmail(usuario?.email);

  const productosProveedor = proveedorLogueado 
    ? productos.filter(p => proveedorLogueado.categorías.includes(p.categoría)) 
    : [];

  const handleSolicitarReabastecimiento = (producto) => {
    const nuevaOrden = {
      proveedorId: proveedorLogueado.id,
      productos: [
        { productoId: producto.id, cantidad: 10, precioUnitario: producto.precio * 0.6 }
      ],
      total: producto.precio * 0.6 * 10,
      fechaSolicitud: new Date().toISOString().split('T')[0],
      fechaEstimadaEntrega: new Date(Date.now() + proveedorLogueado.tiempoEntrega * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estado: 'Solicitado',
      notas: 'Solicitud de reabastecimiento para stock bajo'
    };
    agregarOrden(nuevaOrden);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        Mis Productos
      </h1>

      <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#39ff14]/30">
                <th className="text-gray-400 font-['inter'] py-4 px-6">Producto</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Categoría</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Stock Actual</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Precio Venta</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Precio Compra</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Margen Estimado</th>
                <th className="text-gray-400 font-['inter'] py-4 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosProveedor.map(producto => {
                const precioCompra = producto.precio * 0.6;
                const margen = ((producto.precio - precioCompra) / producto.precio) * 100;
                const stockBajo = producto.stock < 5;
                
                return (
                  <tr
                  key={producto.id}
                  className={`border-b border-[#39ff14]/20 ${stockBajo ? 'bg-red-500/10' : ''}`}
                >
                  <td className="text-white font-['inter'] py-4 px-6">{producto.nombre}</td>
                  <td className="text-gray-300 font-['inter'] py-4 px-6">{producto.categoría}</td>
                  <td className={`py-4 px-6 font-['inter'] ${stockBajo ? 'text-red-400 font-bold' : 'text-white'}`}>
                    {producto.stock}
                    {stockBajo && <span className="ml-2 text-xs">(Stock bajo - Considera reabastecer)</span>}
                  </td>
                  <td className="text-[#39ff14] font-['orbitron'] py-4 px-6">S/ {producto.precio.toFixed(2)}</td>
                  <td className="text-gray-300 font-['inter'] py-4 px-6">S/ {precioCompra.toFixed(2)}</td>
                  <td className="text-blue-400 font-['orbitron'] py-4 px-6">{margen.toFixed(1)}%</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleSolicitarReabastecimiento(producto)}
                      className="bg-[#39ff14] text-[#0a0a0a] px-4 py-2 rounded font-['inter'] hover:bg-[#39ff14]/80"
                    >
                      Solicitar Reabastecimiento
                    </button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MisProductos;
