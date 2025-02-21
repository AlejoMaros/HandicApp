import React, { useEffect, useState } from "react";
import { FaBell, FaEyeSlash, FaTrash, FaCheck } from "react-icons/fa";
import "./notificacionesEmpleado.css";

const NotificacionesEmpleado = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [filtro, setFiltro] = useState("todas"); // "todas" o "no-leidas"

  // Al montar, cargamos desde localStorage (o generamos un set de ejemplo)
  useEffect(() => {
    const data = localStorage.getItem("notificacionesEmpleado");
    if (data) {
      setNotificaciones(JSON.parse(data));
    } else {
      // Datos de ejemplo
      const exampleNotifs = [
        {
          id: 1,
          title: "Vacuna Programada",
          description: "La yegua Bella requiere vacuna en 2 días.",
          date: "2025-03-14",
          type: "evento",
          read: false,
        },
        {
          id: 2,
          title: "Gastos sin registrar",
          description: "Hay 2 gastos pendientes de ingresar en Inversiones.",
          date: "2025-03-13",
          type: "tarea",
          read: false,
        },
        {
          id: 3,
          title: "Nuevo Mensaje de Propietario",
          description:
            "El propietario solicitó un informe detallado de gastos del mes.",
          date: "2025-03-12",
          type: "alerta",
          read: true,
        },
      ];
      setNotificaciones(exampleNotifs);
    }
  }, []);

  // Cada vez que cambie 'notificaciones', guardamos en localStorage
  useEffect(() => {
    localStorage.setItem(
      "notificacionesEmpleado",
      JSON.stringify(notificaciones)
    );
  }, [notificaciones]);

  // Marcar como leída
  const handleMarcarLeida = (id) => {
    const updated = notificaciones.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotificaciones(updated);
  };

  // Eliminar notificación
  const handleEliminar = (id) => {
    const updated = notificaciones.filter((n) => n.id !== id);
    setNotificaciones(updated);
  };

  // Filtrar las notificaciones según el estado 'filtro'
  const notifsFiltradas =
    filtro === "no-leidas"
      ? notificaciones.filter((n) => !n.read)
      : notificaciones;

  return (
    <div className="notificaciones-bg">
      <div className="notificaciones-container">
        <h2 className="titulo">
          <FaBell /> Notificaciones
        </h2>
        <p className="subtitulo">
          Recibe alertas y recordatorios importantes sobre tus caballos y tareas.
        </p>

        {/* Barra de filtro */}
        <div className="filtro-bar">
          <button
            className={filtro === "todas" ? "active" : ""}
            onClick={() => setFiltro("todas")}
          >
            Todas
          </button>
          <button
            className={filtro === "no-leidas" ? "active" : ""}
            onClick={() => setFiltro("no-leidas")}
          >
            No Leídas
          </button>
        </div>

        {notifsFiltradas.length === 0 ? (
          <p className="sin-notificaciones">
            {filtro === "no-leidas"
              ? "No tienes notificaciones pendientes."
              : "No hay notificaciones."}
          </p>
        ) : (
          <ul className="lista-notificaciones">
            {notifsFiltradas.map((notif) => (
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

export default NotificacionesEmpleado;
