// src/components/ChartEmpleado.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ChartEmpleado = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-2">Citas por Empleado</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Empleado.nombre" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default ChartEmpleado;
