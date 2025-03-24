import React, { useEffect, useState } from "react";
import { FaBell, FaTrash, FaCheck } from "react-icons/fa";
import "./notificaciones.css";

const Notificaciones = () => {
  // Estado de notificaciones (usamos una key distinta para el propietario)
  const [notificaciones, setNotificaciones] = useState([]);
  // Filtro por estado: "todas" o "no-leidas"
  const [filtroEstado, setFiltroEstado] = useState("todas");
  // Filtro por tipo: "todos", "evento", "tarea" o "alerta"
  const [filtroTipo, setFiltroTipo] = useState("todos");

  // Cargar notificaciones desde localStorage o usar datos de ejemplo
  useEffect(() => {
    const data = localStorage.getItem("notificacionesPropietario");
    if (data) {
      setNotificaciones(JSON.parse(data));
    } else {
      const exampleNotifs = [
        {
          id: 1,
          title: "Informe Financiero Mensual",
          description: "El informe financiero de marzo ya está disponible.",
          date: "2025-03-14",
          type: "alerta",
          read: false,
        },
        {
          id: 2,
          title: "Nuevo Registro de Caballo",
          description: "Se ha registrado el caballo 'Estrella' en el sistema.",
          date: "2025-03-13",
          type: "evento",
          read: false,
        },
        {
          id: 3,
          title: "Mensaje del Gerente",
          description: "El gerente solicita revisar las estadísticas semanales.",
          date: "2025-03-12",
          type: "tarea",
          read: true,
        },
      ];
      setNotificaciones(exampleNotifs);
    }
  }, []);

  // Guardar notificaciones en localStorage al actualizar
  useEffect(() => {
    localStorage.setItem(
      "notificacionesPropietario",
      JSON.stringify(notificaciones)
    );
  }, [notificaciones]);

  // Funciones para actualizar el estado
  const handleMarcarLeida = (id) => {
    const updated = notificaciones.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotificaciones(updated);
  };

  const handleEliminar = (id) => {
    const updated = notificaciones.filter((n) => n.id !== id);
    setNotificaciones(updated);
  };

  // Filtrar notificaciones por estado y tipo
  const notifsFiltradas = notificaciones.filter((n) => {
    const matchEstado = filtroEstado === "no-leidas" ? !n.read : true;
    const matchTipo = filtroTipo === "todos" ? true : n.type === filtroTipo;
    return matchEstado && matchTipo;
  });

  // Ordenar por fecha descendente
  const notifsOrdenadas = notifsFiltradas.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="notificaciones-bg">
      <div className="notificaciones-container">
        <h2 className="titulo">
          <FaBell /> Notificaciones del Propietario
        </h2>
        <p className="subtitulo">
          Recibe alertas importantes, informes y mensajes relevantes del sistema.
        </p>

        {/* Barra de filtros */}
        <div className="filtro-bar">
          <div className="estado-filtros">
            <button
              className={filtroEstado === "todas" ? "active" : ""}
              onClick={() => setFiltroEstado("todas")}
            >
              Todas
            </button>
            <button
              className={filtroEstado === "no-leidas" ? "active" : ""}
              onClick={() => setFiltroEstado("no-leidas")}
            >
              No Leídas
            </button>
          </div>
          <div className="tipo-filtro">
            <label>Filtrar por Tipo:</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="evento">Evento</option>
              <option value="tarea">Tarea</option>
              <option value="alerta">Alerta</option>
            </select>
          </div>
        </div>

        {notifsOrdenadas.length === 0 ? (
          <p className="sin-notificaciones">
            {filtroEstado === "no-leidas"
              ? "No tienes notificaciones pendientes."
              : "No hay notificaciones."}
          </p>
        ) : (
          <ul className="lista-notificaciones">
            {notifsOrdenadas.map((notif) => (
              <li
                key={notif.id}
                className={`notif-item ${notif.read ? "leida" : "no-leida"}`}
              >
                <div className="notif-header">
                  <h3 className="notif-title">{notif.title}</h3>
                  <span className="notif-date">
                    {new Date(notif.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="notif-description">{notif.description}</p>
                <div className="notif-actions">
                  {!notif.read && (
                    <button
                      className="btn-leer"
                      onClick={() => handleMarcarLeida(notif.id)}
                    >
                      <FaCheck /> Marcar como Leída
                    </button>
                  )}
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(notif.id)}
                  >
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notificaciones;
