import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "./calendario.css";

const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Cargar eventos desde localStorage o usar algunos de ejemplo
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

  // Filtrar eventos según la categoría seleccionada
  useEffect(() => {
    if (filter === "Todos") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((e) => e.category === filter));
    }
  }, [filter, events]);

  // Eventos de los próximos 7 días para la sidebar
  const upcomingEvents = events.filter((ev) => {
    const now = new Date();
    const evDate = new Date(ev.date);
    const diffDays = (evDate - now) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 7;
  });

  // Mostrar modal de detalles (modo solo lectura) al hacer clic en un evento
  const handleEventClick = (arg) => {
    const ev = events.find((e) => e.id === arg.event.id);
    if (!ev) return;
    setSelectedEvent(ev);
    setShowEventModal(true);
  };

  const handleModalClose = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  // Estadísticas adicionales
  const totalEvents = events.length;
  const totalCost = events.reduce((sum, ev) => sum + Number(ev.cost), 0);
  const countByCategory = events.reduce((acc, ev) => {
    acc[ev.category] = (acc[ev.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="calendario-bg">
      <div className="calendario-container">
        <h2 className="titulo">Calendario Propietario</h2>
        <p className="subtitulo">
          Consulta los eventos, estadísticas y detalles importantes.
        </p>

        <div className="calendario-main">
          {/* Sidebar */}
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

            {/* Estadísticas adicionales */}
            <div className="sidebar-card statistics">
              <h3 className="sidebar-title">Estadísticas</h3>
              <p>
                <strong>Total de eventos:</strong> {totalEvents}
              </p>
              <p>
                <strong>Costo total estimado:</strong> ${totalCost}
              </p>
              <p>
                <strong>Eventos por categoría:</strong>
              </p>
              <ul>
                {Object.entries(countByCategory).map(([cat, count]) => (
                  <li key={cat}>
                    {cat}: {count}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Calendario */}
          <div className="calendar-card">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              initialView="dayGridMonth"
              events={filteredEvents}
              eventClick={handleEventClick}
              editable={false}
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

      {/* Modal de detalles (solo lectura) */}
      {showEventModal && selectedEvent && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Detalles del Evento</h2>
            <div className="modal-details">
              <p>
                <strong>Título:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Fecha:</strong> {selectedEvent.date}
              </p>
              <p>
                <strong>Categoría:</strong> {selectedEvent.category}
              </p>
              <p>
                <strong>Caballo:</strong> {selectedEvent.horse}
              </p>
              <p>
                <strong>Costo Estimado:</strong> ${selectedEvent.cost}
              </p>
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={handleModalClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="calendario-footer">
        © 2025 HandiApp. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Calendario;
