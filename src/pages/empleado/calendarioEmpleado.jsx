import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // Componente React de FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "./calendarioEmpleado.css";

const CalendarioEmpleado = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [filteredEvents, setFilteredEvents] = useState([]);

  // showEventModal controla la visibilidad del modal
  const [showEventModal, setShowEventModal] = useState(false);
  // selectedEvent contiene el evento que estamos creando o editando
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Al montar, cargamos eventos de localStorage o creamos algunos de ejemplo
  useEffect(() => {
    const storedEvents = localStorage.getItem("eventsCalendario");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      const initialEvents = [
        {
          id: "1",
          title: "Revisión Veterinaria - Bella",
          date: "2025-02-15",
          category: "Veterinaria",
          horse: "Bella",
          cost: 1000,
        },
        {
          id: "2",
          title: "Competencia - Caballo Rápido",
          date: "2025-02-18",
          category: "Competición",
          horse: "Caballo Rápido",
          cost: 2000,
        },
        {
          id: "3",
          title: "Vacunación - Estrella",
          date: "2025-02-20",
          category: "Vacunación",
          horse: "Estrella",
          cost: 500,
        },
      ];
      setEvents(initialEvents);
    }
  }, []);

  // Guardar eventos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("eventsCalendario", JSON.stringify(events));
  }, [events]);

  // Filtrar eventos según la categoría
  useEffect(() => {
    if (filter === "Todos") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((e) => e.category === filter));
    }
  }, [filter, events]);

  // Notificación simulada (eventos hoy o mañana)
  useEffect(() => {
    const today = new Date();
    const upcoming = events.filter((event) => {
      const eventDate = new Date(event.date);
      const diffTime = eventDate - today;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 1;
    });
    if (upcoming.length > 0) {
      console.log("Notificación: Tienes eventos próximos.");
    }
  }, [events]);

  // Obtener eventos de los próximos 7 días para la sidebar
  const upcomingEvents = events.filter((ev) => {
    const now = new Date();
    const evDate = new Date(ev.date);
    const diffDays = (evDate - now) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 7; // dentro de 7 días
  });

  /**
   * Al hacer clic en una fecha vacía:
   * Creamos un "nuevo evento" con la fecha pre-seleccionada,
   * y abrimos el modal en modo "crear" (id = null).
   */
  const handleDateClick = (arg) => {
    setSelectedEvent({
      id: null,
      title: "",
      date: arg.dateStr,
      category: "Veterinaria", // Valor por defecto
      horse: "",
      cost: 0,
    });
    setShowEventModal(true);
  };

  // Al hacer clic en un evento
  const handleEventClick = (arg) => {
    const ev = events.find((e) => e.id === arg.event.id);
    if (!ev) return;
    setSelectedEvent(ev);
    setShowEventModal(true);
  };

  // Drag & drop en el calendario
  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) => {
      if (event.id === info.event.id) {
        return { ...event, date: info.event.startStr };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  // Cerrar modal
  const handleModalClose = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  // Guardar cambios al CREAR o EDITAR
  const handleSaveEvent = () => {
    if (!selectedEvent) return;

    // Si "id" es null => creamos uno nuevo
    if (selectedEvent.id === null) {
      const newEvent = {
        ...selectedEvent,
        id: Date.now().toString(), // algo único
      };
      setEvents([...events, newEvent]);
    } else {
      // Modo edición
      const updatedEvents = events.map((ev) =>
        ev.id === selectedEvent.id ? selectedEvent : ev
      );
      setEvents(updatedEvents);
    }

    handleModalClose();
  };

  // Eliminar evento
  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    handleModalClose();
  };

  // Manejar inputs en el modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({ ...selectedEvent, [name]: value });
  };

  return (
    <div className="calendario-bg">
      <div className="calendario-container">
        <h2 className="titulo">Calendario</h2>
        <p className="subtitulo">
          Organiza aquí las revisiones, entrenamientos, competiciones y otros eventos.
        </p>

        {/* Contenido principal en flex: sidebar izquierda + calendario derecha */}
        <div className="calendario-main">
          {/* Sidebar con próximos eventos */}
          <div className="sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Próximos 7 días</h3>
              {upcomingEvents.length === 0 ? (
                <p>No hay eventos próximos en los próximos 7 días.</p>
              ) : (
                <ul className="eventos-lista">
                  {upcomingEvents.map((ev) => (
                    <li key={ev.id}>
                      <strong>{ev.date}:</strong> {ev.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Filtro por categoría */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">Filtrar por Categoría</h3>
              <div className="filters">
                {["Todos", "Veterinaria", "Competición", "Vacunación"].map(
                  (cat) => (
                    <button
                      key={cat}
                      className={`filter-button ${filter === cat ? "active" : ""}`}
                      onClick={() => setFilter(cat)}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Tarjeta con el calendario en sí */}
          <div className="calendar-card">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              initialView="dayGridMonth"
              events={filteredEvents}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              eventDrop={handleEventDrop}
              editable={true}
              height="auto"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal para crear/editar/eliminar evento */}
      {showEventModal && selectedEvent && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>
              {selectedEvent.id === null ? "Nuevo Evento" : "Detalles del Evento"}
            </h2>
            <div className="modal-form">
              <label>
                Título:
                <input
                  type="text"
                  name="title"
                  value={selectedEvent.title}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Fecha:
                <input
                  type="date"
                  name="date"
                  value={selectedEvent.date}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Categoría:
                <select
                  name="category"
                  value={selectedEvent.category}
                  onChange={handleInputChange}
                >
                  <option value="Veterinaria">Veterinaria</option>
                  <option value="Competición">Competición</option>
                  <option value="Vacunación">Vacunación</option>
                </select>
              </label>
              <label>
                Caballo:
                <input
                  type="text"
                  name="horse"
                  value={selectedEvent.horse || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Costo Estimado:
                <input
                  type="number"
                  name="cost"
                  value={selectedEvent.cost || 0}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="modal-buttons">
              <button className="save-button" onClick={handleSaveEvent}>
                {selectedEvent.id === null ? "Crear" : "Guardar"}
              </button>
              {selectedEvent.id !== null && (
                <button className="delete-button" onClick={handleDeleteEvent}>
                  Eliminar
                </button>
              )}
              <button className="cancel-button" onClick={handleModalClose}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer fijo (barra negra con derechos reservados) */}
      <footer className="calendario-footer">
        © 2025 HandiApp. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default CalendarioEmpleado;
