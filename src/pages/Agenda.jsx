import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Agenda() {
  const [citas, setCitas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showClienteForm, setShowClienteForm] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [showCitaModal, setShowCitaModal] = useState(false);
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [montoPago, setMontoPago] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [showCitaDetalles, setShowCitaDetalles] = useState(false);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    fecha_nacimiento: "",
    fuente_adquisicion: ""
});

  
  const [nuevaCita, setNuevaCita] = useState({
    fecha: "",
    horaInicio: "",
    horaFin: "",
    clienteId: "",
    servicioId: 1,
    empleadoId: 1,
  });

  useEffect(() => {
    cargarDatos();
    cargarClientes();
    cargarEmpleados();
    
  }, []);

  const cargarDatos = async () => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/citas");
        console.log("Datos recibidos del backend:", data);

        const citasFormateadas = data.map((cita) => {
            if (!cita.fecha || !cita.horaInicio || !cita.horaFin) {
                console.warn("Cita con valores inválidos:", cita);
                return null;
            }

            // **Asignación de colores por estado**
            let colorEvento;
            switch (cita.estado) {
                case "confirmada":
                    colorEvento = "green"; // ✅ Verde si está confirmada
                    break;
                case "reagendada":
                    colorEvento = "purple"; // 🟣 Morado si fue reagendada
                    break;
                case "cancelada":
                    colorEvento = "red"; // ❌ Rojo si fue cancelada
                    break;
                default:
                    colorEvento = "blue"; // 🔵 Azul si aún está pendiente
            }

            return {
                id: cita.id,
                title: `${cita.servicio.nombre} - ${cita.cliente.nombre}`,
                start: new Date(`${cita.fecha.split('T')[0]}T${cita.horaInicio}`).toISOString(),
                end: new Date(`${cita.fecha.split('T')[0]}T${cita.horaFin}`).toISOString(),
                backgroundColor: colorEvento, // ✅ Agregar color al evento
                textColor: "white", // Para que el texto sea visible
                telefono: cita.cliente.telefono,
                clienteId: cita.cliente.id,
            };
        }).filter(cita => cita !== null);

        console.log("Citas formateadas para FullCalendar:", citasFormateadas);
        setCitas(citasFormateadas);
    } catch (error) {
        console.error("Error cargando citas:", error);
        toast.error("Error al cargar datos del backend: " + error.message);
    }
};

  const cargarClientes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/clientes");
      setClientes(data);
    } catch (error) {
      toast.error("Error al cargar clientes");
    }
  };

  const cargarEmpleados = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/empleados");
      setEmpleados(data);
    } catch (error) {
      toast.error("Error al cargar empleados");
    }
  };

  const crearCliente = async (cliente) => {
    try {
        const response = await axios.post("http://localhost:5000/api/clientes", {
            nombre: cliente.nombre,
            correo: cliente.correo,
            telefono: cliente.telefono,
            fecha_nacimiento: cliente.fecha_nacimiento || null,  // Se envía null si no está definido
            fuente_adquisicion: cliente.fuente_adquisicion || null
        });

        toast.success("Cliente creado con éxito");
        console.log("Cliente creado:", response.data);
        await cargarClientes(); // <-- Aquí llamamos a cargarClientes()
    } catch (error) {
        console.error("Error al crear cliente:", error);
        toast.error("Error al crear el cliente");
    }
};

const confirmarCita = async (idCita) => {
    try {
        const response = await axios.post("https://e467-181-51-32-26.ngrok-free.app/api/whatsapp", {
            telefono: citaSeleccionada.telefono,
            mensaje: `¡Hola! ¿Deseas confirmar tu cita para ${citaSeleccionada.fecha} a las ${citaSeleccionada.horaInicio}? Responde con "Confirmar" o "Reprogramar".`
        });

        if (response.data.success) {
            toast.success("Mensaje de confirmación enviado. Esperando respuesta del cliente...");
        }
    } catch (error) {
        console.error("Error enviando mensaje de confirmación:", error);
        toast.error("Hubo un problema enviando el mensaje.");
    }
};

const enviarMensajeConfirmacion = async (telefono, cita) => {
    try {
        await axios.post("http://localhost:5000/api/whatsapp", {
            telefono: `whatsapp:${telefono}`,
            mensaje: `¡Hola! Tu cita para ${cita.title.split(" - ")[0]} ha sido confirmada para el día ${new Date(cita.start).toLocaleDateString()} a las ${new Date(cita.start).toLocaleTimeString()}. ¡Te esperamos en el spa!`,
        });

        toast.success("Mensaje de confirmación enviado");
    } catch (error) {
        console.error("Error al enviar el mensaje de WhatsApp:", error);
        toast.error("No se pudo enviar el mensaje de confirmación");
    }
};

  const handleCrearCita = async () => {
    try {
      const { fecha, horaInicio, horaFin, clienteId, servicioId, empleadoId } = nuevaCita;
      await axios.post("http://localhost:5000/api/citas", { fecha, horaInicio, horaFin, clienteId, servicioId, empleadoId });
      toast.success("Cita creada exitosamente");
      setShowModal(false);
      cargarDatos();
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.error || "No se pudo crear la cita"}`);
    }
  };
  const registrarPago = async () => {
    if (!montoPago || !metodoPago) {
      toast.error("Debe ingresar el monto y seleccionar un método de pago");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/pagos", {
        id_cita: citaSeleccionada.id,
        monto: montoPago,
        metodo_pago: metodoPago,
      });
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Pago registrado exitosamente");
  
        // Cerrar los modales después del pago
        setShowPagoModal(false);
        setShowCitaDetalles(false);
  
        // Verificar si cargarCitas está definido antes de llamarlo
        if (typeof cargarCitas === "function") {
          cargarCitas();
        } else {
          console.warn("⚠️ Advertencia: cargarCitas no está definido.");
        }
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error("Error al registrar el pago:", error);
      toast.error("Error al registrar el pago");
    }
  };
  
  
   
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <ToastContainer />

    <div className="flex flex-col justify-center items-center w-full py-12 relative">
        {/* Fondo degradado dinámico */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-100 to-gray-200 opacity-50 blur-xl"></div>

        {/* Contenedor decorativo con líneas y filigranas */}
        <div className="flex items-center justify-center w-full mb-6">
            <span className="decorative-line"></span>
            <span className="filigrana">✦</span>
            
            {/* Logo con efecto de resplandor y animación */}
            <img 
                src="/logo.png" 
                alt="Spa Melomerezco" 
                className="w-48 h-auto mx-4 drop-shadow-xl transition-transform duration-300 hover:scale-105"
            />
            
            <span className="filigrana">✦</span>
            <span className="decorative-line"></span>
        </div>

       
       {/* Título con estilo más elegante */}
<h2 className="agenda-titulo">
    Agenda de Citas
</h2>

    </div>

      <button className="bg-yellow-500 text-white py-2 px-4 rounded-md mb-4" onClick={() => setShowModal(true)}>
        Agregar Cita
      </button>
      <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    locale={esLocale}
    events={citas}
    editable={true}
    selectable={true}
    headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" }}
    eventClick={(info) => {
        const citaId = info.event.id;
        const cita = citas.find((c) => c.id === parseInt(citaId));
        if (cita) {
            setCitaSeleccionada(cita);
            setShowCitaModal(true);
        }
    }}
/>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 shadow-lg z-60">
            <h3 className="text-xl font-bold mb-4">Agregar Nueva Cita</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Fecha:</label>
              <input
                type="date"
                className="w-full border px-2 py-1 rounded"
                value={nuevaCita.fecha}
                onChange={(e) => setNuevaCita({ ...nuevaCita, fecha: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Hora Inicio:</label>
              <input
                type="time"
                className="w-full border px-2 py-1 rounded"
                value={nuevaCita.horaInicio}
                onChange={(e) => setNuevaCita({ ...nuevaCita, horaInicio: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Hora Fin:</label>
              <input
                type="time"
                className="w-full border px-2 py-1 rounded"
                value={nuevaCita.horaFin}
                onChange={(e) => setNuevaCita({ ...nuevaCita, horaFin: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Cliente:</label>
              <select
                className="w-full border px-2 py-1 rounded"
                value={nuevaCita.clienteId}
                onChange={(e) => setNuevaCita({ ...nuevaCita, clienteId: e.target.value })}
              >
                <option value="">Selecciona un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Empleado:</label>
              <select
                className="w-full border px-2 py-1 rounded"
                value={nuevaCita.empleadoId}
                onChange={(e) => setNuevaCita({ ...nuevaCita, empleadoId: e.target.value })}
              >
                <option value="">Selecciona un empleado</option>
                {empleados.map((empleado) => (
                  <option key={empleado.id} value={empleado.id}>
                    {empleado.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md" onClick={handleCrearCita}>
              Crear Cita
            </button>
            <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
            <button
    className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-md"
    onClick={() => setShowClienteForm(true)}
>
    Agregar Nuevo Cliente
</button>

          </div>
        </div>
      )}

      {showClienteForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Agregar Nuevo Cliente</h3>
            
            <label className="block text-sm font-semibold">Nombre:</label>
            <input
                type="text"
                placeholder="Nombre"
                className="w-full border px-2 py-1 mb-4 rounded"
                value={nuevoCliente.nombre}
                onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
            />
            
            <label className="block text-sm font-semibold">Correo:</label>
            <input
                type="email"
                placeholder="Correo"
                className="w-full border px-2 py-1 mb-4 rounded"
                value={nuevoCliente.correo}
                onChange={(e) => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })}
            />

            <label className="block text-sm font-semibold">Teléfono:</label>
            <input
                type="text"
                placeholder="Teléfono"
                className="w-full border px-2 py-1 mb-4 rounded"
                value={nuevoCliente.telefono}
                onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
            />
{/* Fecha de Nacimiento (Opcional) */}
<label className="block text-sm font-semibold">Fecha de Nacimiento:</label>
            <input
                type="date"
                className="w-full border px-2 py-1 mb-4 rounded"
                value={nuevoCliente.fecha_nacimiento}
                onChange={(e) => setNuevoCliente({ ...nuevoCliente, fecha_nacimiento: e.target.value })}
            />

            {/* Fuente de Adquisición (Opcional) */}
            <label className="block text-sm font-semibold">Fuente de Adquisición:</label>
            <select
                className="w-full border px-2 py-1 mb-4 rounded"
                value={nuevoCliente.fuente_adquisicion}
                onChange={(e) => setNuevoCliente({ ...nuevoCliente, fuente_adquisicion: e.target.value })}
            >
                <option value="">Seleccione una opción</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Recomendación">Recomendación</option>
                <option value="Otro">Otro</option>
            </select>
            <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={() => {
                  console.log("Cliente antes de enviar:", nuevoCliente);
                  if (nuevoCliente.nombre && nuevoCliente.correo && nuevoCliente.telefono) {
                      crearCliente(nuevoCliente);
                      setShowClienteForm(false);
                  } else {
                      toast.error("Debe llenar los campos obligatorios (Nombre, Correo y Teléfono)");
                  }
              }}
              
            >
              Crear Cliente
            </button>
            <button
              className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
              onClick={() => setShowClienteForm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      
      {showCitaModal && citaSeleccionada && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md w-96 shadow-lg z-60">
            <h3 className="text-xl font-bold mb-4">Detalles de la Cita</h3>
            <p><strong>Cliente:</strong> {citaSeleccionada.title.split(" - ")[1]}</p>
            <p><strong>Servicio:</strong> {citaSeleccionada.title.split(" - ")[0]}</p>
            <p><strong>Fecha:</strong> {new Date(citaSeleccionada.start).toLocaleDateString()}</p>
            <p><strong>Hora:</strong> {new Date(citaSeleccionada.start).toLocaleTimeString()} - {new Date(citaSeleccionada.end).toLocaleTimeString()}</p>
            <p><strong>Estado:</strong> {citaSeleccionada.estado}</p>
            
            {/* Botón para Registrar Pago */}
      
            <button 
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md w-full"
                onClick={() => confirmarCita(citaSeleccionada.id)}
            >
                Confirmar Cita
            </button>
            <button
        className="bg-green-500 text-white py-2 px-4 rounded-md w-full mt-4"
        onClick={() => setShowPagoModal(true)}
      >
        Registrar Pago 💳
      </button>

            <button 
                className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md w-full"
                onClick={() => setShowCitaModal(false)}
            >
                Cerrar
            </button>
            
        </div>
    </div>
)}
{showPagoModal && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-md w-96 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Registrar Pago</h3>

      <label className="block text-sm font-semibold">Monto a Pagar:</label>
      <input
        type="number"
        placeholder="Ingrese el monto"
        className="w-full border px-2 py-1 mb-4 rounded"
        value={montoPago}
        onChange={(e) => setMontoPago(e.target.value)}
      />

      <label className="block text-sm font-semibold">Método de Pago:</label>
      <select
        className="w-full border px-2 py-1 mb-4 rounded"
        value={metodoPago}
        onChange={(e) => setMetodoPago(e.target.value)}
      >
        <option value="Efectivo">Efectivo</option>
        <option value="Tarjeta">Tarjeta</option>
        <option value="Transferencia">Transferencia</option>
      </select>

      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
        onClick={registrarPago}
      >
        Confirmar Pago ✅
      </button>

      <button
        className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md w-full mt-2"
        onClick={() => setShowPagoModal(false)}
      >
        Cancelar ❌
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default Agenda;
