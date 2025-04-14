// src/components/ClienteForm.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { getClientes } from "../utils/api";
const API_URL = import.meta.env.VITE_API_URL;
const ClienteForm = ({ setClientes, setShowClienteForm }) => {
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    fecha_nacimiento: "",
    fuente_adquisicion: "",
  });

  const handleCrearCliente = async () => {
    if (!nuevoCliente.nombre || !nuevoCliente.correo || !nuevoCliente.telefono) {
      toast.error("Debe llenar todos los campos obligatorios");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/clientes`, nuevoCliente);
      toast.success("Cliente creado exitosamente");
      const clientesActualizados = await getClientes();
      setClientes(clientesActualizados);
      setShowClienteForm(false);
    } catch (error) {
      toast.error("Error al crear cliente");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Agregar Nuevo Cliente</h3>
        <input
          type="text"
          placeholder="Nombre"
          className="w-full border px-2 py-1 mb-4 rounded"
          value={nuevoCliente.nombre}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          className="w-full border px-2 py-1 mb-4 rounded"
          value={nuevoCliente.correo}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Teléfono"
          className="w-full border px-2 py-1 mb-4 rounded"
          value={nuevoCliente.telefono}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
        />
        <button className="bg-green-500 text-white py-2 px-4 rounded-md" onClick={handleCrearCliente}>
          Crear Cliente
        </button>
        <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md" onClick={() => setShowClienteForm(false)}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ClienteForm
