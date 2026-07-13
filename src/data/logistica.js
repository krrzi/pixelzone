
// Couriers iniciales
export const couriersIniciales = [
  {
    id: 1,
    nombre: "Carlos Ramírez",
    empresa: "Olva Courier",
    telefono: "987-654-321",
    zonaCobertura: ["Trujillo Centro", "La Esperanza", "El Porvenir"],
    calificacion: 4.8,
    entregasCompletadas: 125,
    estado: "activo"
  },
  {
    id: 2,
    nombre: "María Torres",
    empresa: "Shalom",
    telefono: "912-345-678",
    zonaCobertura: ["Trujillo Sur", "Los Laureles", "San Andrés"],
    calificacion: 4.6,
    entregasCompletadas: 98,
    estado: "activo"
  },
  {
    id: 3,
    nombre: "Pedro Gutiérrez",
    empresa: "Servientrega",
    telefono: "934-567-890",
    zonaCobertura: ["Trujillo Norte", "Víctor Larco", "Huanchaco"],
    calificacion: 4.9,
    entregasCompletadas: 156,
    estado: "activo"
  },
  {
    id: 4,
    nombre: "Ana López",
    empresa: "PixelZone Delivery",
    telefono: "956-789-012",
    zonaCobertura: ["Trujillo Centro", "Trujillo Sur"],
    calificacion: 4.7,
    entregasCompletadas: 78,
    estado: "activo"
  },
  {
    id: 5,
    nombre: "Luis Castillo",
    empresa: "PixelZone Delivery",
    telefono: "978-901-234",
    zonaCobertura: ["La Esperanza", "El Porvenir", "Víctor Larco"],
    calificacion: 4.5,
    entregasCompletadas: 67,
    estado: "inactivo"
  }
];

// Envios iniciales, uno por cada pedido
export const enviosIniciales = [
  {
    id: 1,
    pedidoId: 1,
    courierId: 1,
    clienteNombre: "Bruno Villena",
    direccionEntrega: "Calle Los Girasoles 123, Trujillo Centro",
    distrito: "Trujillo Centro",
    latitud: -8.1117,
    longitud: -79.0286,
    estado: "Entregado",
    fechaEstimada: "2026-06-27",
    fechaEntregaReal: "2026-06-26",
    costoEnvio: 15.90,
    historialEstados: [
      { estado: "Pendiente", fecha: "2026-06-25T10:00:00Z" },
      { estado: "En preparación", fecha: "2026-06-25T14:00:00Z" },
      { estado: "En camino", fecha: "2026-06-26T09:00:00Z" },
      { estado: "Entregado", fecha: "2026-06-26T16:30:00Z" }
    ]
  },
  {
    id: 2,
    pedidoId: 2,
    courierId: 2,
    clienteNombre: "Cliente Prueba",
    direccionEntrega: "Av. Larco 456, San Andrés",
    distrito: "San Andrés",
    latitud: -8.1075,
    longitud: -79.0321,
    estado: "En camino",
    fechaEstimada: "2026-06-30",
    fechaEntregaReal: null,
    costoEnvio: 12.90,
    historialEstados: [
      { estado: "Pendiente", fecha: "2026-06-26T11:00:00Z" },
      { estado: "En preparación", fecha: "2026-06-27T09:00:00Z" },
      { estado: "En camino", fecha: "2026-06-28T10:00:00Z" }
    ]
  },
  {
    id: 3,
    pedidoId: 3,
    courierId: 3,
    clienteNombre: "Juan Pérez",
    direccionEntrega: "Calle Los Pinos 789, Huanchaco",
    distrito: "Huanchaco",
    latitud: -8.0675,
    longitud: -79.0412,
    estado: "Pendiente",
    fechaEstimada: "2026-07-02",
    fechaEntregaReal: null,
    costoEnvio: 18.90,
    historialEstados: [
      { estado: "Pendiente", fecha: "2026-06-27T16:00:00Z" }
    ]
  },
  {
    id: 4,
    pedidoId: 4,
    courierId: 4,
    clienteNombre: "María López",
    direccionEntrega: "Jr. Pizarro 321, Trujillo Sur",
    distrito: "Trujillo Sur",
    latitud: -8.1256,
    longitud: -79.0218,
    estado: "Entregado",
    fechaEstimada: "2026-06-30",
    fechaEntregaReal: "2026-06-29",
    costoEnvio: 10.90,
    historialEstados: [
      { estado: "Pendiente", fecha: "2026-06-28T10:00:00Z" },
      { estado: "En preparación", fecha: "2026-06-29T09:00:00Z" },
      { estado: "En camino", fecha: "2026-06-29T11:00:00Z" },
      { estado: "Entregado", fecha: "2026-06-29T15:45:00Z" }
    ]
  },
  {
    id: 5,
    pedidoId: 5,
    courierId: 1,
    clienteNombre: "Carlos Gómez",
    direccionEntrega: "Calle Las Acacias 654, La Esperanza",
    distrito: "La Esperanza",
    latitud: -8.0987,
    longitud: -79.0354,
    estado: "En camino",
    fechaEstimada: "2026-07-01",
    fechaEntregaReal: null,
    costoEnvio: 14.90,
    historialEstados: [
      { estado: "Pendiente", fecha: "2026-06-28T12:00:00Z" },
      { estado: "En preparación", fecha: "2026-06-29T10:00:00Z" },
      { estado: "En camino", fecha: "2026-06-30T09:00:00Z" }
    ]
  },
  {
    id: 6,
    pedidoId: 6,
    courierId: null,
    clienteNombre: "Ana Ruiz",
    direccionEntrega: "Av. Independencia 987, El Porvenir",
    distrito: "El Porvenir",
    latitud: -8.0912,
    longitud: -79.0489,
    estado: "Pendiente",
    fechaEstimada: "2026-07-03",
    fechaEntregaReal: null,
    costoEnvio: 16.90,
    historialEstados: [
      { estado: "Pendiente", fecha: "2026-06-29T09:00:00Z" }
    ]
  },
  {
    id: 7,
    pedidoId: 7,
    courierId: 2,
    clienteNombre: "Bruno Villena",
    direccionEntrega: "Calle Los Girasoles 123, Trujillo Centro",
    distrito: "Trujillo Centro",
    latitud: -8.1117,
    longitud: -79.0286,
    estado: "En preparación",
    fechaEstimada: "2026-07-02",
    fechaEntregaReal: null,
    costoEnvio: 13.90,
    historialEstados: [
      { estado: "Pendiente", fecha: "2026-06-29T14:00:00Z" },
      { estado: "En preparación", fecha: "2026-06-30T08:00:00Z" }
    ]
  },
  {
    id: 8,
    pedidoId: 8,
    courierId: 3,
    clienteNombre: "Pedro Martínez",
    direccionEntrega: "Calle Los Rosales 147, Víctor Larco",
    distrito: "Víctor Larco",
    latitud: -8.1212,
    longitud: -79.0156,
    estado: "Incidencia",
    fechaEstimada: "2026-07-01",
    fechaEntregaReal: null,
    costoEnvio: 17.90,
    historialEstados: [
      { estado: "Pendiente", fecha: "2026-06-29T16:00:00Z" },
      { estado: "En preparación", fecha: "2026-06-30T09:00:00Z" },
      { estado: "En camino", fecha: "2026-07-01T10:00:00Z" },
      { estado: "Incidencia", fecha: "2026-07-01T12:30:00Z" }
    ]
  }
];
