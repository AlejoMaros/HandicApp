import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  if (!user) return null;

  const perfilPath =
    user.role === "propietario"
      ? "/propietario/perfil"
      : "/empleado/perfilEmpleado";

  const navItems =
    user.role === "propietario"
      ? [
          { name: "Inicio", path: "/propietario/inicio" },
          { name: "Caballos", path: "/propietario/caballos" },
          { name: "Inversiones", path: "/propietario/inversiones" },
          { name: "Calendario", path: "/propietario/calendario" },
          { name: "Estadísticas", path: "/propietario/estadisticas" },
          { name: "Notificaciones", path: "/propietario/notificaciones" },
        ]
      : [
          { name: "Inicio", path: "/empleado/inicioEmpleado" },
          { name: "Caballos", path: "/empleado/caballosEmpleado" },
          { name: "Inversiones", path: "/empleado/inversionesEmpleado" },
          { name: "Calendario", path: "/empleado/calendarioEmpleado" },
          { name: "Estadísticas", path: "/empleado/estadisticasEmpleado" },
          { name: "Notificaciones", path: "/empleado/notificacionesEmpleado" },
        ];

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <nav className="navbar">
      {/* Perfil */}
      <div className="navbar-left">
        <Link to={perfilPath} className="perfil-link">
          Perfil
        </Link>
      </div>

      {/* Icono de menú hamburguesa */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </div>

      {/* Menú de navegación */}
      <ul className={`navbar-menu ${menuAbierto ? "open" : ""}`}>
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`navbar-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <Link to={item.path} onClick={() => setMenuAbierto(false)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Espacio derecho vacío */}
      <div className="navbar-right"></div>
    </nav>
  );
};

export default Navbar;
