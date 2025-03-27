import React from "react";

const CitaDetalles = ({ cita, setShowPagoModal }) => {
  return (
    <div className="modal">
      <h3>Detalles de la Cita</h3>
      <p>Cliente: {cita.clienteNombre}</p>
      <p>Servicio: {cita.servicio}</p>
      <p>Fecha: {cita.fecha}</p>
      <p>Estado: {cita.estado}</p>
      <button onClick={() => setShowPagoModal(true)}>Registrar Pago</button>
    </div>
  );
};

export default CitaDetalles;
