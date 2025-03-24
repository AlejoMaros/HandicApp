import React, { useEffect, useState } from "react";
import "./Header.css";
import LogoPNG3 from "../assets/LogoPNG3.png"; // Verifica que la ruta sea correcta

const Header = () => {
  const [role, setRole] = useState("propietario"); // Valor por defecto

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) {
      setRole(storedUser.role);
    }
  }, []);

  const welcomeText =
   //role === "empleado" ? "Bienvenido Empleado" : "Bienvenido Propietario";
   role === "empleado" ? "Empleado"  : "Propietario";
  return (
    <header className="app-header">
      <div className="header-brand">
        {/* Se reemplaza el texto "HandicApp" por la imagen */}
        <img src={LogoPNG3} alt="Logo HandicApp" />
      </div>
      <div className="header-actions">
        <span className="welcome-text">{welcomeText}</span>
      </div>
    </header>
  );
};

export default Header;
