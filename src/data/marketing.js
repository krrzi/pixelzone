export const cuponesIniciales = [
  { id: 1, codigo: 'GAMER10', tipo: 'porcentaje', valor: 10, fechaVencimiento: '2026-12-31', vecesUsado: 45, vecesDisponibles: 200, estado: 'activo', descripcion: 'Descuento para gamers frecuentes' },
  { id: 2, codigo: 'SETUP50', tipo: 'monto_fijo', valor: 50, fechaVencimiento: '2026-08-15', vecesUsado: 23, vecesDisponibles: 100, estado: 'activo', descripcion: 'Descuento fijo para setups completos' },
  { id: 3, codigo: 'RGB20', tipo: 'porcentaje', valor: 20, fechaVencimiento: '2026-09-30', vecesUsado: 67, vecesDisponibles: 150, estado: 'activo', descripcion: 'Descuento especial para productos RGB' },
  { id: 4, codigo: 'NAVIDAD15', tipo: 'porcentaje', valor: 15, fechaVencimiento: '2025-12-31', vecesUsado: 120, vecesDisponibles: 200, estado: 'vencido', descripcion: 'Descuento navideño expirado' },
  { id: 5, codigo: 'WELCOME5', tipo: 'porcentaje', valor: 5, fechaVencimiento: '2026-12-31', vecesUsado: 89, vecesDisponibles: 500, estado: 'activo', descripcion: 'Bienvenida a nuevos clientes' },
  { id: 6, codigo: 'EXPIRED10', tipo: 'porcentaje', valor: 10, fechaVencimiento: '2026-01-01', vecesUsado: 0, vecesDisponibles: 100, estado: 'desactivado', descripcion: 'Cupón desactivado para pruebas' }
];

export const campanasIniciales = [
  { id: 1, nombre: 'Ofertas de Verano', canal: 'Redes Sociales', estado: 'Activa', fechaInicio: '2026-06-01', fechaFin: '2026-08-31', alcanceEstimado: 10000, conversiones: 560, presupuesto: 2000, gastado: 1200 },
  { id: 2, nombre: 'Email Promocional Semanal', canal: 'Email', estado: 'Activa', fechaInicio: '2026-01-01', fechaFin: '2026-12-31', alcanceEstimado: 5000, conversiones: 320, presupuesto: 500, gastado: 250 },
  { id: 3, nombre: 'Black Friday Preview', canal: 'Web', estado: 'Pausada', fechaInicio: '2026-11-01', fechaFin: '2026-11-30', alcanceEstimado: 25000, conversiones: 0, presupuesto: 3000, gastado: 0 },
  { id: 4, nombre: 'Recordatorio de Abandono', canal: 'Push', estado: 'Finalizada', fechaInicio: '2026-03-01', fechaFin: '2026-05-31', alcanceEstimado: 3000, conversiones: 180, presupuesto: 800, gastado: 750 }
];
