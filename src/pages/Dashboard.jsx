// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import KpiCards from '../components/KpiCards';
import FiltrosDashboard from '../components/FiltrosDashboard';
import ChartEstado from '../components/ChartEstado';
import ChartEmpleado from '../components/ChartEmpleado';
import ChartServicio from '../components/ChartServicio';
import ChartClientes from '../components/ChartClientes';
import ChartServiciosPopulares from '../components/ChartServiciosPopulares';
import HorarioPicoCard from '../components/HorarioPicoCard';
import ListaServicios from '../components/ListaServicios';
import ModalEmpleado from '../components/ModalEmpleado';
import ModalServicio from '../components/ModalServicio';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [reportPeriod, setReportPeriod] = useState('mensual');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(5, 7));
  const [reportData, setReportData] = useState([]);
  const [kpis, setKpis] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [showEmpleadoModal, setShowEmpleadoModal] = useState(false);
  const [showServicioModal, setShowServicioModal] = useState(false);
  const [servicios, setServicios] = useState([]);

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    correo: '',
    telefono: ''
  });

  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', precio: '', duracion: '' });

  useEffect(() => {
    fetchMetrics(reportPeriod, selectedMonth);
    fetchServicios();
    obtenerNombreUsuario();
  }, [reportPeriod, selectedMonth]);

  const obtenerNombreUsuario = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.nombre) {
      setNombreUsuario(usuario.nombre);
    }
  };

  const fetchMetrics = async (period, month) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/dashboard/reportes/${period}?mes=${month}`);
      const citas = res.data.citas || [];

      const citasPorEstado = citas.reduce((acc, cita) => {
        const estado = cita.estado || 'Desconocido';
        const index = acc.findIndex((e) => e.estado === estado);
        if (index >= 0) acc[index].total++;
        else acc.push({ estado, total: 1 });
        return acc;
      }, []);

      const citasPorEmpleado = citas.reduce((acc, cita) => {
        const nombre = cita.Empleado?.nombre || 'Desconocido';
        const index = acc.findIndex((e) => e['Empleado.nombre'] === nombre);
        if (index >= 0) acc[index].total++;
        else acc.push({ 'Empleado.nombre': nombre, total: 1 });
        return acc;
      }, []);

      const citasPorServicio = citas.reduce((acc, cita) => {
        const nombre = cita.servicio?.nombre || 'Sin servicio';
        const index = acc.findIndex((e) => e['servicio.nombre'] === nombre);
        if (index >= 0) acc[index].total++;
        else acc.push({ 'servicio.nombre': nombre, total: 1 });
        return acc;
      }, []);

      setMetrics({ citasPorEstado, citasPorEmpleado, citasPorServicio });
      setReportData(citas);
      setKpis(res.data.kpis);
    } catch (error) {
      console.error('Error al obtener métricas:', error);
    }
  };

  const fetchServicios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/servicios");
      setServicios(response.data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
    }
  };

  const handleExport = () => {
    if (reportData.length === 0) return;
    const formattedData = reportData.map((cita) => ({
      ID: cita.id,
      Fecha: cita.fecha,
      HoraInicio: cita.horaInicio,
      HoraFin: cita.horaFin,
      Cliente: cita.cliente?.nombre || 'Sin cliente',
      TelefonoCliente: cita.cliente?.telefono || 'Sin teléfono',
      Servicio: cita.servicio?.nombre || 'Sin servicio',
      PrecioServicio: cita.servicio?.precio || 0,
      Empleado: cita.Empleado?.nombre || 'Sin empleado',
      Estado: cita.estado
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `Reporte_${selectedMonth}.xlsx`);
  };
  const exportarClientes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clientes"); // Ajusta si usas otra ruta
      const clientes = res.data;
  
      const datosFormateados = clientes.map((cliente) => ({
        ID: cliente.id,
        Nombre: cliente.nombre,
        Correo: cliente.correo,
        Teléfono: cliente.telefono,
        FechaNacimiento: cliente.fecha_nacimiento || '',
        FuenteAdquisicion: cliente.fuente_adquisicion || '',
      }));
  
      const worksheet = XLSX.utils.json_to_sheet(datosFormateados);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");
  
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(data, "Clientes.xlsx");
    } catch (error) {
      toast.error("Error al exportar clientes");
      console.error("Error al exportar clientes:", error);
    }
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="text-center mb-10">
        <img src="/logo.png" alt="Logo" className="w-48 mx-auto drop-shadow-xl" />
        <h2 className="text-2xl font-bold mt-4">Bienvenido, <span className="text-blue-500">{nombreUsuario}</span>!</h2>
        <p className="text-gray-500">Administrador SPA</p>
      </header>

      <KpiCards kpis={kpis} />
      <FiltrosDashboard
        reportPeriod={reportPeriod}
        selectedMonth={selectedMonth}
        setReportPeriod={setReportPeriod}
        setSelectedMonth={setSelectedMonth}
        openEmpleadoModal={() => setShowEmpleadoModal(true)}
        openServicioModal={() => setShowServicioModal(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {metrics && <>
          <ChartEstado data={metrics.citasPorEstado} />
          <ChartEmpleado data={metrics.citasPorEmpleado} />
          <ChartServicio data={metrics.citasPorServicio} />
        </>}
        {kpis && <>
          <ChartClientes nuevos={kpis.nuevosClientes} recurrentes={kpis.recurrentesClientes} />
          <ChartServiciosPopulares data={kpis.serviciosPopulares} />
          <HorarioPicoCard horario={kpis.horarioPico} />
        </>}
      </div>

      <ListaServicios servicios={servicios} />

      <div className="mt-6 flex justify-end gap-4">
  <button
    onClick={handleExport}
    className="bg-blue-500 text-white py-2 px-4 rounded"
  >
    Exportar Citas a Excel 📄
  </button>

  <button
    onClick={exportarClientes}
    className="bg-green-600 text-white py-2 px-4 rounded"
  >
    Exportar Clientes 🧑‍💼
  </button>
</div>


      {showEmpleadoModal && (
        <ModalEmpleado
          empleado={nuevoEmpleado}
          setEmpleado={setNuevoEmpleado}
          onClose={() => setShowEmpleadoModal(false)}
          onSaveSuccess={() => {
            setShowEmpleadoModal(false);
            setNuevoEmpleado({ nombre: '', correo: '', telefono: '' });
            toast.success('Empleado creado exitosamente');
          }}
        />
      )}

      {showServicioModal && (
        <ModalServicio
          servicio={nuevoServicio}
          setServicio={setNuevoServicio}
          servicios={servicios}
          setServicios={setServicios}
          onClose={() => setShowServicioModal(false)}
          onSaveSuccess={() => {
            setShowServicioModal(false);
            setNuevoServicio({ nombre: '', precio: '', duracion: '' });
            toast.success('Servicio creado con éxito');
          }}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
