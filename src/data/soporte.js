
export const faqsIniciales = [
  { id: 1, pregunta: "¿Cuánto tiempo tarda en llegar mi pedido?", respuesta: "El tiempo de entrega depende de tu ubicación, pero normalmente es de 2 a 5 días hábiles.", categoria: "Envíos" },
  { id: 2, pregunta: "¿Cómo puedo cancelar mi pedido?", respuesta: "Puedes cancelar tu pedido dentro de las primeras 24 horas de haberlo realizado, contactando a soporte.", categoria: "Pedidos" },
  { id: 3, pregunta: "¿Qué métodos de pago aceptan?", respuesta: "Aceptamos tarjetas de crédito/débito, PayPal y pagos móviles como Yape y Plin.", categoria: "Pagos" },
  { id: 4, pregunta: "¿Cómo solicito un reembolso?", respuesta: "Puedes solicitar un reembolso a través del formulario de ticket de soporte, selecciona 'Solicitud de reembolso' como motivo.", categoria: "Devoluciones" },
  { id: 5, pregunta: "¿Cómo cambio mi contraseña?", respuesta: "Ve a tu perfil, sección 'Seguridad' y podrás actualizar tu contraseña.", categoria: "Cuenta" }
];

export const ticketsIniciales = [
  {
    id: 1,
    clienteId: 1,
    clienteNombre: "Bruno Villena",
    pedidoId: 1,
    envioId: 1,
    asunto: "Problema con la entrega de mi pedido",
    motivo: "Demora en entrega",
    mensajes: [
      { autor: "cliente", texto: "Mi pedido debería haber llegado ayer y aún no lo recibo.", fecha: "2026-07-01T10:30:00Z" },
      { autor: "soporte", texto: "Hola Bruno, revisaremos el estado de tu envío y te notificaremos pronto.", fecha: "2026-07-01T11:00:00Z" }
    ],
    estado: "En proceso",
    prioridad: "Alta",
    fechaCreacion: "2026-07-01T10:30:00Z",
    fechaCierre: null,
    calificacionCliente: null,
    compensacionAplicada: null
  },
  {
    id: 2,
    clienteId: 2,
    clienteNombre: "Cliente Prueba",
    pedidoId: 2,
    envioId: 2,
    asunto: "Producto llegó dañado",
    motivo: "Producto dañado",
    mensajes: [
      { autor: "cliente", texto: "El teclado que compré llegó con una tecla rota.", fecha: "2026-06-28T14:00:00Z" },
      { autor: "soporte", texto: "Lo siento mucho, te enviaremos un reemplazo inmediatamente.", fecha: "2026-06-28T14:30:00Z" }
    ],
    estado: "Resuelto",
    prioridad: "Alta",
    fechaCreacion: "2026-06-28T14:00:00Z",
    fechaCierre: "2026-06-29T09:00:00Z",
    calificacionCliente: 5,
    compensacionAplicada: null
  },
  {
    id: 3,
    clienteId: 3,
    clienteNombre: "Juan Pérez",
    pedidoId: 3,
    envioId: 3,
    asunto: "Consulta sobre el estado del pedido",
    motivo: "Consulta general",
    mensajes: [
      { autor: "cliente", texto: "¿Podrían decirme en qué estado está mi pedido?", fecha: "2026-06-25T09:15:00Z" },
      { autor: "soporte", texto: "Tu pedido está en camino y llegará en los próximos días.", fecha: "2026-06-25T09:30:00Z" }
    ],
    estado: "Cerrado",
    prioridad: "Baja",
    fechaCreacion: "2026-06-25T09:15:00Z",
    fechaCierre: "2026-06-25T09:30:00Z",
    calificacionCliente: 4,
    compensacionAplicada: null
  },
  {
    id: 4,
    clienteId: 4,
    clienteNombre: "María López",
    pedidoId: null,
    envioId: null,
    asunto: "Problema con el cupón GAMER10",
    motivo: "Problema con cupón",
    mensajes: [
      { autor: "cliente", texto: "Intenté usar el cupón GAMER10 pero no funcionó.", fecha: "2026-07-02T16:45:00Z" }
    ],
    estado: "Abierto",
    prioridad: "Media",
    fechaCreacion: "2026-07-02T16:45:00Z",
    fechaCierre: null,
    calificacionCliente: null,
    compensacionAplicada: null
  },
  {
    id: 5,
    clienteId: 5,
    clienteNombre: "Carlos Gómez",
    pedidoId: 5,
    envioId: 5,
    asunto: "Solicitud de reembolso",
    motivo: "Solicitud de reembolso",
    mensajes: [
      { autor: "cliente", texto: "Quiero solicitar un reembolso para mi pedido, no me gustó el producto.", fecha: "2026-06-20T11:30:00Z" },
      { autor: "soporte", texto: "Hemos procesado tu solicitud, el reembolso llegará en 5-7 días hábiles.", fecha: "2026-06-21T10:00:00Z" }
    ],
    estado: "Resuelto",
    prioridad: "Media",
    fechaCreacion: "2026-06-20T11:30:00Z",
    fechaCierre: "2026-06-21T10:00:00Z",
    calificacionCliente: null,
    compensacionAplicada: null
  },
  {
    id: 6,
    clienteId: 6,
    clienteNombre: "Ana Ruiz",
    pedidoId: 6,
    envioId: 6,
    asunto: "No llegó el pedido",
    motivo: "No llegó el pedido",
    mensajes: [
      { autor: "cliente", texto: "El pedido no llegó y el estado dice entregado.", fecha: "2026-06-15T08:00:00Z" },
      { autor: "soporte", texto: "Lo sentimos, revisaremos con el courier y te contactaremos.", fecha: "2026-06-15T08:30:00Z" }
    ],
    estado: "En proceso",
    prioridad: "Alta",
    fechaCreacion: "2026-06-15T08:00:00Z",
    fechaCierre: null,
    calificacionCliente: null,
    compensacionAplicada: null
  },
  {
    id: 7,
    clienteId: 1,
    clienteNombre: "Bruno Villena",
    pedidoId: 7,
    envioId: 7,
    asunto: "Consulta sobre envío",
    motivo: "Consulta general",
    mensajes: [
      { autor: "cliente", texto: "¿Podrían darme más información sobre el estado de mi envío?", fecha: "2026-07-03T10:00:00Z" }
    ],
    estado: "Abierto",
    prioridad: "Baja",
    fechaCreacion: "2026-07-03T10:00:00Z",
    fechaCierre: null,
    calificacionCliente: null,
    compensacionAplicada: null
  },
  {
    id: 8,
    clienteId: null,
    clienteNombre: "Pedro Martínez",
    pedidoId: 8,
    envioId: 8,
    asunto: "Reclamo por demora",
    motivo: "Demora en entrega",
    mensajes: [
      { autor: "cliente", texto: "Mi pedido tiene una demora de más de una semana.", fecha: "2026-06-10T14:20:00Z" },
      { autor: "soporte", texto: "Te enviaremos un cupón de compensación por la demora.", fecha: "2026-06-11T09:00:00Z" }
    ],
    estado: "Cerrado",
    prioridad: "Media",
    fechaCreacion: "2026-06-10T14:20:00Z",
    fechaCierre: "2026-06-11T09:00:00Z",
    calificacionCliente: 5,
    compensacionAplicada: 6
  }
];
