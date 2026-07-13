import React, { createContext, useState, useEffect } from 'react';
import { cuponesIniciales, campanasIniciales } from '../data/marketing';

export const MarketingContext = createContext();

export const MarketingProvider = ({ children }) => {
  // Initialize state from localStorage or use defaults
  const [cupones, setCupones] = useState(() => {
    const saved = localStorage.getItem('pixelzone_cupones');
    return saved ? JSON.parse(saved) : cuponesIniciales;
  });
  const [campanas, setCampanas] = useState(() => {
    const saved = localStorage.getItem('pixelzone_campanas');
    return saved ? JSON.parse(saved) : campanasIniciales;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('pixelzone_cupones', JSON.stringify(cupones));
  }, [cupones]);

  useEffect(() => {
    localStorage.setItem('pixelzone_campanas', JSON.stringify(campanas));
  }, [campanas]);

  // Cupon functions
  const crearCupon = (nuevoCupon) => {
    const cuponConId = {
      ...nuevoCupon,
      id: Date.now(),
      vecesUsado: nuevoCupon.vecesUsado || 0
    };
    setCupones([...cupones, cuponConId]);
    return cuponConId;
  };

  const editarCupon = (id, datosActualizados) => {
    setCupones(
      cupones.map((cupon) =>
        cupon.id === id ? { ...cupon, ...datosActualizados } : cupon
      )
    );
  };

  const desactivarCupon = (id) => {
    setCupones(
      cupones.map((cupon) =>
        cupon.id === id ? { ...cupon, estado: cupon.estado === 'activo' ? 'desactivado' : 'activo' } : cupon
      )
    );
  };

  const validarCupon = (codigo) => {
    const cupon = cupones.find((c) => c.codigo.toUpperCase() === codigo.toUpperCase());
    if (!cupon) return null;
    if (cupon.estado !== 'activo') return null;
    if (new Date(cupon.fechaVencimiento) < new Date()) return null;
    if (cupon.vecesUsado >= cupon.vecesDisponibles) return null;
    return cupon;
  };

  const incrementarUso = (codigo) => {
    setCupones(
      cupones.map((cupon) =>
        cupon.codigo.toUpperCase() === codigo.toUpperCase()
          ? { ...cupon, vecesUsado: cupon.vecesUsado + 1 }
          : cupon
      )
    );
  };

  // Campana functions
  const crearCampana = (nuevaCampana) => {
    const campanaConId = {
      ...nuevaCampana,
      id: Date.now()
    };
    setCampanas([...campanas, campanaConId]);
  };

  const editarCampana = (id, datosActualizados) => {
    setCampanas(
      campanas.map((campana) =>
        campana.id === id ? { ...campana, ...datosActualizados } : campana
      )
    );
  };

  const toggleCampana = (id) => {
    setCampanas(
      campanas.map((campana) => {
        if (campana.id === id) {
          let nuevoEstado = 'Activa';
          if (campana.estado === 'Activa') nuevoEstado = 'Pausada';
          else if (campana.estado === 'Pausada') nuevoEstado = 'Activa';
          else nuevoEstado = 'Finalizada';
          return { ...campana, estado: nuevoEstado };
        }
        return campana;
      })
    );
  };

  return (
    <MarketingContext.Provider
      value={{
        cupones,
        campanas,
        crearCupon,
        editarCupon,
        desactivarCupon,
        validarCupon,
        incrementarUso,
        crearCampana,
        editarCampana,
        toggleCampana
      }}
    >
      {children}
    </MarketingContext.Provider>
  );
};
