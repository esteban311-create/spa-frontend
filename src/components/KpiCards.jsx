// src/components/KpiCards.jsx
import React from 'react';

const KpiCards = ({ kpis }) => {
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 shadow rounded text-center">
        <h3 className="text-lg font-semibold">Total de Citas</h3>
        <p className="text-2xl text-blue-500">{kpis.totalCitas}</p>
      </div>
      <div className="bg-white p-4 shadow rounded text-center">
        <h3 className="text-lg font-semibold">Tasa de Cancelación</h3>
        <p className="text-2xl text-red-500">{kpis.tasaCancelacion}%</p>
      </div>
      <div className="bg-white p-4 shadow rounded text-center">
        <h3 className="text-lg font-semibold">Ingresos Generados</h3>
        <p className="text-2xl text-green-500">${kpis.ingresosGenerados}</p>
      </div>
      <div className="bg-white p-4 shadow rounded text-center">
        <h3 className="text-lg font-semibold">Tasa de Retención</h3>
        <p className="text-2xl text-yellow-500">{kpis.tasaRetencion}%</p>
      </div>
    </div>
  );
};

export default KpiCards;
