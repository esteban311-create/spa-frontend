// src/components/CitaModal.jsx
import { useState } from "react";
import { registrarPago } from "../utils/api";
import { toast } from "react-toastify";

const CitaModal = ({ cita, setShowCitaModal, actualizarCitas }) => {
  const [monto, setMonto] = useState(cita.precio || "");
  const [metodoPago, setMetodoPago] = useState("Efectivo");

  const handleRegistrarPago = async () => {
    if (!monto || !metodoPago) {
      toast.error("Debe ingresar el monto y seleccionar un método de pago");
      return;
    }

    try {
      await registrarPago({ id_cita: cita.id, monto, metodo_pago: metodoPago });
      toast.success("Pago registrado exitosamente");
      actualizarCitas();
      setShowCitaModal(false);
    } catch (error) {
      toast.error("Error al registrar el pago");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Detalles de la Cita</h3>
        <p>Cliente: {cita.cliente}</p>
        <p>Servicio: {cita.servicio}</p>
        <p>Fecha: {cita.fecha}</p>
        <p>Hora: {cita.hora}</p>

        <label>Monto a Pagar:</label>
        <input
          type="number"
          className="w-full border px-2 py-1 mb-4 rounded"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <label>Método de Pago:</label>
        <select className="w-full border px-2 py-1 mb-4 rounded" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Transferencia">Transferencia</option>
        </select>

        <button className="bg-green-500 text-white py-2 px-4 rounded-md" onClick={handleRegistrarPago}>
          Confirmar Pago
        </button>
        <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md" onClick={() => setShowCitaModal(false)}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CitaModal;
