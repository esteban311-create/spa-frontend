// src/components/HorarioPicoCard.jsx
import React from 'react';

const HorarioPicoCard = ({ horario }) => {
  if (!horario) return null;

  return (
    <div className="bg-white p-4 shadow rounded text-center">
      <h2 className="text-xl font-semibold mb-2">Horario Pico de Citas</h2>
      <p className="text-2xl text-purple-500">{horario}</p>
    </div>
  );
};

export default HorarioPicoCard;
