export const ordenesCompra = [
  {
    id: 1,
    númeroOrden: "OC-2025-001",
    proveedorId: 1,
    productos: [
      { productoId: 1, cantidad: 10, precioUnitario: 100.00 },
      { productoId: 2, cantidad: 5, precioUnitario: 200.00 }
    ],
    total: 2000.00,
    fechaSolicitud: "2025-06-01",
    fechaEstimadaEntrega: "2025-06-04",
    estado: "Recibido",
    notas: "Pedido regular para reposición de stock"
  },
  {
    id: 2,
    númeroOrden: "OC-2025-002",
    proveedorId: 1,
    productos: [
      { productoId: 3, cantidad: 15, precioUnitario: 150.00 },
      { productoId: 11, cantidad: 8, precioUnitario: 180.00 }
    ],
    total: 3690.00,
    fechaSolicitud: "2025-06-15",
    fechaEstimadaEntrega: "2025-06-18",
    estado: "En Tránsito",
    notas: "Pedido urgentemente solicitado"
  },
  {
    id: 3,
    númeroOrden: "OC-2025-003",
    proveedorId: 2,
    productos: [
      { productoId: 4, cantidad: 5, precioUnitario: 500.00 },
      { productoId: 5, cantidad: 20, precioUnitario: 60.00 }
    ],
    total: 3700.00,
    fechaSolicitud: "2025-06-20",
    fechaEstimadaEntrega: "2025-06-25",
    estado: "Solicitado",
    notas: ""
  },
  {
    id: 4,
    númeroOrden: "OC-2025-004",
    proveedorId: 3,
    productos: [
      { productoId: 17, cantidad: 30, precioUnitario: 80.00 },
      { productoId: 20, cantidad: 12, precioUnitario: 220.00 }
    ],
    total: 5040.00,
    fechaSolicitud: "2025-05-10",
    fechaEstimadaEntrega: "2025-05-12",
    estado: "Recibido",
    notas: "Kit de RAM para promoción"
  },
  {
    id: 5,
    númeroOrden: "OC-2025-005",
    proveedorId: 5,
    productos: [
      { productoId: 33, cantidad: 8, precioUnitario: 1800.00 },
      { productoId: 37, cantidad: 20, precioUnitario: 180.00 }
    ],
    total: 18000.00,
    fechaSolicitud: "2025-07-01",
    fechaEstimadaEntrega: "2025-07-07",
    estado: "Solicitado",
    notas: "Pedido especial para lanzamientos"
  },
  {
    id: 6,
    númeroOrden: "OC-2025-006",
    proveedorId: 1,
    productos: [
      { productoId: 6, cantidad: 25, precioUnitario: 70.00 },
      { productoId: 12, cantidad: 15, precioUnitario: 200.00 }
    ],
    total: 4750.00,
    fechaSolicitud: "2025-07-05",
    fechaEstimadaEntrega: "2025-07-08",
    estado: "En Tránsito",
    notas: "Reposición de verano"
  }
];
