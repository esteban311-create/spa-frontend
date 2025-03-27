import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

const Calendar = ({ citas, setCitaSeleccionada, setShowPagoModal }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={esLocale}
      events={citas}
      eventClick={(info) => {
        const cita = citas.find((c) => c.id === parseInt(info.event.id));
        if (cita) {
          setCitaSeleccionada(cita);
          setShowPagoModal(true);
        }
      }}
    />
  );
};

export default Calendar;
