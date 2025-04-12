// src/components/ModalServicio.jsx
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

const ModalServicio = ({ servicio, setServicio, servicios, setServicios, onClose, onSaveSuccess }) => {
  const handleCrearServicio = async () => {
    if (!servicio.nombre || !servicio.precio) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/servicios`, servicio);

      setServicios([...servicios, response.data]);
      onSaveSuccess();
    } catch (error) {
      console.error('Error al crear servicio:', error);
      toast.error('Error al crear servicio');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Crear Servicio</h2>

        <input
          type="text"
          placeholder="Nombre del Servicio"
          className="border p-2 w-full mb-3"
          value={servicio.nombre}
          onChange={(e) => setServicio({ ...servicio, nombre: e.target.value })}
        />

        <input
          type="number"
          placeholder="Precio"
          className="border p-2 w-full mb-3"
          value={servicio.precio}
          onChange={(e) => setServicio({ ...servicio, precio: e.target.value })}
        />

        <input
          type="number"
          placeholder="Duración (en minutos)"
          className="border p-2 w-full mb-4"
          value={servicio.duracion}
          onChange={(e) => setServicio({ ...servicio, duracion: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleCrearServicio}
          >
            Guardar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalServicio;
