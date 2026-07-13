
import React, { createContext, useState, useEffect } from 'react';
import { couriersIniciales, enviosIniciales } from '../data/logistica';

export const LogisticaContext = createContext();

export const LogisticaProvider = ({ children }) => {
  // Initialize state from localStorage or use defaults
  const [couriers, setCouriers] = useState(() => {
    const saved = localStorage.getItem('pixelzone-couriers');
    return saved ? JSON.parse(saved) : couriersIniciales;
  });

  const [envios, setEnvios] = useState(() => {
    const saved = localStorage.getItem('pixelzone-envios');
    return saved ? JSON.parse(saved) : enviosIniciales;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('pixelzone-couriers', JSON.stringify(couriers));
  }, [couriers]);

  useEffect(() => {
    localStorage.setItem('pixelzone-envios', JSON.stringify(envios));
  }, [envios]);

  // Courier functions
  const crearCourier = (nuevoCourier) => {
    const courierConId = {
      ...nuevoCourier,
      id: Date.now(),
      entregasCompletadas: 0
    };
    setCouriers(prev => [...prev, courierConId]);
  };

  const editarCourier = (id, datosActualizados) => {
    setCouriers(prev =>
      prev.map(courier =>
        courier.id === id ? { ...courier, ...datosActualizados } : courier
      )
    );
  };

  const desactivarCourier = (id) => {
    setCouriers(prev =>
      prev.map(courier =>
        courier.id === id ? { ...courier, estado: courier.estado === 'activo' ? 'inactivo' : 'activo' } : courier
      )
    );
  };

  // Envio functions
  const asignarCourier = (envioId, courierId) => {
    setEnvios(prev =>
      prev.map(envio =>
        envio.id === envioId ? { ...envio, courierId } : envio
      )
    );
  };

  const actualizarEstadoEnvio = (envioId, nuevoEstado) => {
    setEnvios(prev =>
      prev.map(envio => {
        if (envio.id === envioId) {
          const updatedEnvio = {
            ...envio,
            estado: nuevoEstado,
            historialEstados: [
              ...envio.historialEstados,
              { estado: nuevoEstado, fecha: new Date().toISOString() }
            ]
          };

          // If delivered, set fechaEntregaReal and increment courier's entregasCompletadas
          if (nuevoEstado === 'Entregado' && envio.courierId) {
            updatedEnvio.fechaEntregaReal = new Date().toISOString().split('T')[0];
            setCouriers(couriersPrev =>
              couriersPrev.map(courier =>
                courier.id === envio.courierId ? {
                  ...courier,
                  entregasCompletadas: courier.entregasCompletadas + 1
                } : courier
              )
            );
          }

          return updatedEnvio;
        }
        return envio;
      })
    );
  };

  const registrarIncidencia = (envioId, motivo) => {
    setEnvios(prev =>
      prev.map(envio =>
        envio.id === envioId ? {
          ...envio,
          estado: 'Incidencia',
          historialEstados: [
            ...envio.historialEstados,
            { estado: 'Incidencia', fecha: new Date().toISOString(), motivo }
          ]
        } : envio
      )
    );
  };

  return (
    <LogisticaContext.Provider
      value={{
        couriers,
        envios,
        crearCourier,
        editarCourier,
        desactivarCourier,
        asignarCourier,
        actualizarEstadoEnvio,
        registrarIncidencia
      }}
    >
      {children}
    </LogisticaContext.Provider>
  );
};
