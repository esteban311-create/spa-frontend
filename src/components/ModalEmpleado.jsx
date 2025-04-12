// src/components/ModalEmpleado.jsx
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const ModalEmpleado = ({ empleado, setEmpleado, onClose, onSaveSuccess }) => {
  const handleCrearEmpleado = async () => {
    if (!empleado.nombre) {
      toast.error('El nombre del empleado es obligatorio.');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/empleados`, empleado);
      onSaveSuccess();
    } catch (error) {
      console.error('Error al crear empleado:', error);
      toast.error('Error al crear el empleado');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-2xl mb-4">Crear Empleado</h2>

        <input
          type="text"
          placeholder="Nombre del Empleado"
          className="border p-2 w-full mb-4"
          value={empleado.nombre}
          onChange={(e) => setEmpleado({ ...empleado, nombre: e.target.value })}
        />

        <input
          type="email"
          placeholder="Correo Electrónico"
          className="border p-2 w-full mb-4"
          value={empleado.correo}
          onChange={(e) => setEmpleado({ ...empleado, correo: e.target.value })}
        />

        <input
          type="tel"
          placeholder="Teléfono"
          className="border p-2 w-full mb-4"
          value={empleado.telefono}
          onChange={(e) => setEmpleado({ ...empleado, telefono: e.target.value })}
        />

        <div className="flex justify-between">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleCrearEmpleado}
          >
            Guardar
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEmpleado;
