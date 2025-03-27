// src/components/FiltrosDashboard.jsx
import React from 'react';

const MONTHS = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' }
];

const FiltrosDashboard = ({
  reportPeriod,
  selectedMonth,
  setReportPeriod,
  setSelectedMonth,
  openEmpleadoModal,
  openServicioModal
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <label className="text-lg font-semibold">Seleccionar Período:</label>
      <select value={reportPeriod} onChange={(e) => setReportPeriod(e.target.value)} className="border px-2 py-1 rounded">
        <option value="diario">Diario</option>
        <option value="semanal">Semanal</option>
        <option value="mensual">Mensual</option>
      </select>

      <label className="text-lg font-semibold">Seleccionar Mes:</label>
      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="border px-2 py-1 rounded">
        {MONTHS.map((month) => (
          <option key={month.value} value={month.value}>{month.label}</option>
        ))}
      </select>

      <button
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={openEmpleadoModal}
      >
        Crear Empleado
      </button>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={openServicioModal}
      >
        Crear Servicio
      </button>
      <button
  className="bg-yellow-500 text-white py-2 px-4 rounded"
  onClick={() => window.location.href = "/agenda"}
>
  Ir a Agenda 📅
</button>

    </div>
  );
};

export default FiltrosDashboard;
