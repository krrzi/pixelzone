import React, { createContext, useState, useEffect } from 'react';

const empleadosIniciales = [
  {
    id: 1,
    nombre: "Carlos Mendoza",
    dni: "12345678",
    cargo: "CEO",
    area: "Administración",
    fechaIngreso: "2020-01-15",
    salario: 8000,
    estado: "Activo"
  },
  {
    id: 2,
    nombre: "María Rodríguez",
    dni: "23456789",
    cargo: "Gerente de Tecnología",
    area: "Tecnología",
    fechaIngreso: "2020-03-20",
    salario: 6500,
    estado: "Activo"
  },
  {
    id: 3,
    nombre: "José Flores",
    dni: "34567890",
    cargo: "Desarrollador Senior",
    area: "Tecnología",
    fechaIngreso: "2021-01-10",
    salario: 5000,
    estado: "Activo"
  },
  {
    id: 4,
    nombre: "Ana Torres",
    dni: "45678901",
    cargo: "Desarrollador Frontend",
    area: "Tecnología",
    fechaIngreso: "2022-05-15",
    salario: 3500,
    estado: "Activo"
  },
  {
    id: 5,
    nombre: "Luis Gutiérrez",
    dni: "56789012",
    cargo: "Gerente de Marketing",
    area: "Marketing",
    fechaIngreso: "2020-06-01",
    salario: 6000,
    estado: "Activo"
  },
  {
    id: 6,
    nombre: "Valeria Campos",
    dni: "67890123",
    cargo: "Especialista en Marketing",
    area: "Marketing",
    fechaIngreso: "2021-08-20",
    salario: 3000,
    estado: "Activo"
  },
  {
    id: 7,
    nombre: "Pedro Rojas",
    dni: "78901234",
    cargo: "Gerente de Operaciones",
    area: "Logística",
    fechaIngreso: "2020-09-15",
    salario: 6000,
    estado: "Activo"
  },
  {
    id: 8,
    nombre: "Carmen Sánchez",
    dni: "89012345",
    cargo: "Asesor de Ventas",
    area: "Ventas",
    fechaIngreso: "2021-11-01",
    salario: 2500,
    estado: "Inactivo"
  },
  {
    id: 9,
    nombre: "Juan Vásquez",
    dni: "90123456",
    cargo: "Asesor de Ventas Senior",
    area: "Ventas",
    fechaIngreso: "2020-04-10",
    salario: 3200,
    estado: "Activo"
  }
];

export const RRHHContext = createContext();

export const RRHHProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState(() => {
    const saved = localStorage.getItem('pixelzone-empleados');
    return saved ? JSON.parse(saved) : empleadosIniciales;
  });

  useEffect(() => {
    localStorage.setItem('pixelzone-empleados', JSON.stringify(empleados));
  }, [empleados]);

  const agregarEmpleado = (nuevoEmpleado) => {
    const empleadoConId = {
      ...nuevoEmpleado,
      id: Date.now()
    };
    setEmpleados([...empleados, empleadoConId]);
  };

  const editarEmpleado = (id, datosActualizados) => {
    setEmpleados(
      empleados.map(emp =>
        emp.id === id ? { ...emp, ...datosActualizados } : emp
      )
    );
  };

  const toggleEstadoEmpleado = (id) => {
    setEmpleados(
      empleados.map(emp =>
        emp.id === id
          ? { ...emp, estado: emp.estado === "Activo" ? "Inactivo" : "Activo" }
          : emp
      )
    );
  };

  return (
    <RRHHContext.Provider value={{
      empleados,
      agregarEmpleado,
      editarEmpleado,
      toggleEstadoEmpleado
    }}>
      {children}
    </RRHHContext.Provider>
  );
};
