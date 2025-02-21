// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("propietario"); // valor por defecto

  useEffect(() => {
    // Leer el usuario de localStorage (o de un contexto)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) {
      setRole(storedUser.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Determinar texto de bienvenida según el rol
  const welcomeText =
    role === "empleado" ? "Bienvenido, Empleado" : "Bienvenido, Propietario";

  return (
    <header className="header">
      <div className="header-brand">
        <h1>HandicApp</h1>
      </div>
      <div className="header-actions">
        <span className="welcome-text">{welcomeText}</span>
        <button className="logout-button" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-logout"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1"
            />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
