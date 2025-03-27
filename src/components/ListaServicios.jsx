// src/components/ListaServicios.jsx
import React from 'react';

const ListaServicios = ({ servicios }) => {
  if (!servicios || servicios.length === 0) return null;

  return (
    <div className="bg-white p-6 shadow-md rounded mt-8">
      <h2 className="text-xl font-semibold mb-4">Lista de Servicios</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.id} className="text-center">
              <td className="border p-2">{servicio.id}</td>
              <td className="border p-2">{servicio.nombre}</td>
              <td className="border p-2">${servicio.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaServicios;
