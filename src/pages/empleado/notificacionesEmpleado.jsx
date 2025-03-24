import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaTrash,
  FaCheck,
  FaArchive,
  FaExclamationTriangle,
  FaSearch
} from "react-icons/fa";
import "./NotificacionesEmpleado.css";

const NotificacionesEmpleado = ({ onUpdateCount }) => {
  const [notifs, setNotifs] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all' o 'unread'
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all"); // 'all', 'evento', 'tarea', 'alerta', 'urgente'
  const [page, setPage] = useState(1);
  const itemsPerPage = 3; // cantidad de notificaciones por página

  // Cargar notificaciones (datos de ejemplo)
  useEffect(() => {
    const sample = [
      {
        id: 1,
        title: "Vacuna Programada",
        description: "La yegua Bella necesita vacuna en 2 días.",
        date: "2025-03-14",
        type: "evento",
        read: false,
      },
      {
        id: 2,
        title: "Gastos Pendientes",
        description: "Hay 2 gastos por registrar.",
        date: "2025-03-13",
        type: "tarea",
        read: false,
      },
      {
        id: 3,
        title: "Mensaje del Propietario",
        description: "Se solicita informe detallado de gastos.",
        date: "2025-03-12",
        type: "alerta",
        read: true,
      },
      {
        id: 4,
        title: "Control Veterinario",
        description: "Se requiere control veterinario de rutina.",
        date: "2025-03-10",
        type: "urgente",
        read: false,
      },
      {
        id: 5,
        title: "Recordatorio de Ingreso",
        description: "Recuerda ingresar el registro del entrenamiento.",
        date: "2025-03-09",
        type: "tarea",
        read: false,
      },
    ];
    setNotifs(sample);
  }, []);

  // Actualiza localStorage y contador de no leídas para el Navbar
  useEffect(() => {
    localStorage.setItem("notificacionesEmpleado", JSON.stringify(notifs));
    if (onUpdateCount) {
      const count = notifs.filter((n) => !n.read).length;
      onUpdateCount(count);
    }
  }, [notifs, onUpdateCount]);

  // Funciones de acción
  const markAsRead = (id) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const archiveNotif = (id) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, archived: true } : n));
  };

  const deleteNotif = (id) => {
    setNotifs(notifs.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  // Filtros combinados
  const filteredNotifs = notifs
    .filter(n => filter === "all" ? true : !n.read)
    .filter(n => category === "all" ? true : n.type === category)
    .filter(n =>
      n.title.toLowerCase().includes(searchText.toLowerCase()) ||
      n.description.toLowerCase().includes(searchText.toLowerCase())
    );

  // Paginación: se muestran los primeros "page * itemsPerPage"
  const displayedNotifs = filteredNotifs.slice(0, page * itemsPerPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  const collapseList = () => {
    setPage(1);
  };

  // Obtener ícono según tipo
  const getTipoIcono = (type) => {
    switch (type) {
      case "evento":
        return <FaBell className="tipo-icon evento" />;
      case "tarea":
        return <FaBell className="tipo-icon tarea" />;
      case "alerta":
        return <FaExclamationTriangle className="tipo-icon alerta" />;
      case "urgente":
        return <FaExclamationTriangle className="tipo-icon urgente" />;
      default:
        return <FaBell className="tipo-icon" />;
    }
  };

  return (
    <div className="notif-bg">
      <div className="notif-container">
        <header className="notif-header">
          <h2 className="notif-title">
            <FaBell /> Notificaciones
          </h2>
        </header>

        {/* Filtros extra: búsqueda y categoría */}
        <div className="extra-filters">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar notificaciones..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">Todas las categorías</option>
            <option value="evento">Evento</option>
            <option value="tarea">Tarea</option>
            <option value="alerta">Alerta</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>

        {/* Sección superior: botones rápidos */}
        <div className="top-buttons">
          <button className="mark-all-btn" onClick={markAllAsRead}>
            Marcar todas como leídas
          </button>
          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              Todas
            </button>
            <button
              className={filter === "unread" ? "active" : ""}
              onClick={() => setFilter("unread")}
            >
              No leídas
            </button>
          </div>
        </div>

        {displayedNotifs.length === 0 ? (
          <p className="empty-msg">No hay notificaciones.</p>
        ) : (
          <ul className="notif-list">
            {displayedNotifs.map((n) => (
              <li key={n.id} className={`notif-card ${n.read ? "read" : "unread"}`}>
                <div className="card-header">
                  <h3>{n.title}</h3>
                  <span>{new Date(n.date).toLocaleDateString()}</span>
                </div>
                <p className="card-desc">{n.description}</p>
                <div className="card-actions">
                  {!n.read && (
                    <button onClick={() => markAsRead(n.id)} className="btn-read">
                      <FaCheck /> Leído
                    </button>
                  )}
                  <button onClick={() => archiveNotif(n.id)} className="btn-archive">
                    <FaArchive /> Archivar
                  </button>
                  <button onClick={() => deleteNotif(n.id)} className="btn-delete">
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Botones de paginación */}
        {(page > 1 || displayedNotifs.length < filteredNotifs.length) && (
          <div className="load-more-container">
            {page > 1 && (
              <button className="load-more-btn" onClick={collapseList}>
                Ver menos
              </button>
            )}
            {displayedNotifs.length < filteredNotifs.length && (
              <button className="load-more-btn" onClick={loadMore}>
                Cargar más
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificacionesEmpleado;
