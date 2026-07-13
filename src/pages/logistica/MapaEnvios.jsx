
import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LogisticaContext } from '../../context/LogisticaContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const MapaEnvios = () => {
  const { envios, couriers } = useContext(LogisticaContext);
  const enviosActivos = envios.filter(e => e.estado !== 'Entregado');

  const getCourierName = (courierId) => {
    const courier = couriers.find(c => c.id === courierId);
    return courier ? `${courier.nombre} (${courier.empresa})` : 'No asignado';
  };

  const getMarkerColor = (estado) => {
    switch (estado) {
      case 'Pendiente': return '#6b7280';
      case 'En preparación': return '#3b82f6';
      case 'En camino': return '#eab308';
      case 'Incidencia':
      case 'Devuelto':
        return '#ef4444';
      default: return '#39ff14';
    }
  };

  const createCustomIcon = (color) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-[#39ff14] font-['orbitron'] text-3xl font-bold mb-8">
        Mapa de Envíos
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg overflow-hidden">
          <MapContainer
            center={[-8.1117, -79.0286]} // Trujillo, Peru
            zoom={13}
            style={{ height: '600px', width: '100%', filter: 'invert(90%) hue-rotate(180deg)' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {enviosActivos.map(envio => (
              <Marker
                key={envio.id}
                position={[envio.latitud, envio.longitud]}
                icon={createCustomIcon(getMarkerColor(envio.estado))}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold text-[#39ff14]">Pedido #{envio.pedidoId}</h3>
                    <p className="text-gray-800">Cliente: {envio.clienteNombre}</p>
                    <p className="text-gray-800">Dirección: {envio.direccionEntrega}</p>
                    <p className="text-gray-800">Courier: {getCourierName(envio.courierId)}</p>
                    <p className="text-gray-800">Estado: {envio.estado}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* List of active shipments */}
        <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-lg p-6">
          <h2 className="text-white font-['orbitron'] text-xl mb-6">Envíos en Trámite</h2>
          <div className="space-y-4 max-h-[550px] overflow-y-auto">
            {enviosActivos
              .sort((a, b) => new Date(a.fechaEstimada) - new Date(b.fechaEstimada))
              .map(envio => (
                <div
                  key={envio.id}
                  className="border border-[#39ff14]/20 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[#39ff14] font-['orbitron'] font-bold">
                      Pedido #{envio.pedidoId}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-['inter'] ${
                        envio.estado === 'Pendiente'
                          ? 'bg-gray-500/20 text-gray-400'
                          : envio.estado === 'En preparación'
                          ? 'bg-blue-500/20 text-blue-400'
                          : envio.estado === 'En camino'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {envio.estado}
                    </span>
                  </div>
                  <p className="text-white font-['inter'] text-sm mb-1">
                    Cliente: {envio.clienteNombre}
                  </p>
                  <p className="text-gray-400 font-['inter'] text-sm mb-1">
                    {envio.direccionEntrega}, {envio.distrito}
                  </p>
                  <p className="text-gray-400 font-['inter'] text-sm">
                    Fecha estimada: {envio.fechaEstimada}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaEnvios;
