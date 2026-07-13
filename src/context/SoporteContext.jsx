
import React, { createContext, useState, useEffect, useContext } from 'react';
import { faqsIniciales, ticketsIniciales } from '../data/soporte';
import { MarketingContext } from './MarketingContext';

export const SoporteContext = createContext();

export const SoporteProvider = ({ children }) => {
  const { crearCupon } = useContext(MarketingContext);

  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('pixelzone-faqs');
    return saved ? JSON.parse(saved) : faqsIniciales;
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('pixelzone-tickets');
    return saved ? JSON.parse(saved) : ticketsIniciales;
  });

  useEffect(() => {
    localStorage.setItem('pixelzone-faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('pixelzone-tickets', JSON.stringify(tickets));
  }, [tickets]);

  const crearTicket = (datosTicket) => {
    const nuevoTicket = {
      ...datosTicket,
      id: Date.now(),
      estado: 'Abierto',
      fechaCreacion: new Date().toISOString(),
      fechaCierre: null,
      calificacionCliente: null,
      compensacionAplicada: null,
      mensajes: datosTicket.mensajes || []
    };
    setTickets([...tickets, nuevoTicket]);
  };

  const agregarMensaje = (ticketId, autor, texto) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          mensajes: [
            ...ticket.mensajes,
            { autor, texto, fecha: new Date().toISOString() }
          ]
        };
      }
      return ticket;
    }));
  };

  const cambiarEstadoTicket = (ticketId, nuevoEstado) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const updatedTicket = { ...ticket, estado: nuevoEstado };
        if (nuevoEstado === 'Cerrado' && !ticket.fechaCierre) {
          updatedTicket.fechaCierre = new Date().toISOString().split('T')[0];
        }
        return updatedTicket;
      }
      return ticket;
    }));
  };

  const cambiarPrioridad = (ticketId, prioridad) => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, prioridad } : ticket
    ));
  };

  const asignarCalificacion = (ticketId, calificacion) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          calificacionCliente: calificacion,
          estado: 'Cerrado',
          fechaCierre: new Date().toISOString().split('T')[0]
        };
      }
      return ticket;
    }));
  };

  const generarCuponCompensacion = (ticketId) => {
    const cupon = crearCupon({
      codigo: 'COMPENSACION' + Date.now(),
      tipo: 'porcentaje',
      valor: 15,
      fechaVencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      vecesDisponibles: 1,
      estado: 'activo',
      descripcion: 'Cupón de compensación por inconveniente'
    });

    setTickets(tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, compensacionAplicada: cupon.id } : ticket
    ));
  };

  const obtenerFAQs = () => faqs;

  const crearFAQ = (nuevaFAQ) => {
    const faqConId = { ...nuevaFAQ, id: Date.now() };
    setFaqs([...faqs, faqConId]);
  };

  const editarFAQ = (faqId, datosActualizados) => {
    setFaqs(faqs.map(faq =>
      faq.id === faqId ? { ...faq, ...datosActualizados } : faq
    ));
  };

  const eliminarFAQ = (faqId) => {
    setFaqs(faqs.filter(faq => faq.id !== faqId));
  };

  return (
    <SoporteContext.Provider
      value={{
        faqs,
        tickets,
        crearTicket,
        agregarMensaje,
        cambiarEstadoTicket,
        cambiarPrioridad,
        asignarCalificacion,
        generarCuponCompensacion,
        obtenerFAQs,
        crearFAQ,
        editarFAQ,
        eliminarFAQ
      }}
    >
      {children}
    </SoporteContext.Provider>
  );
};
