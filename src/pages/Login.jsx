import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo.png"; // Ajusta la ruta de tu logo

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Demo: usuarios hardcodeados
  const users = [
    { username: "propietario", password: "propietario123", role: "propietario" },
    { username: "empleado", password: "empleado123", role: "empleado" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    const userFound = users.find(
      (u) => u.username === trimmedUser && u.password === trimmedPass
    );
    if (userFound) {
      localStorage.setItem("user", JSON.stringify(userFound));
      setUser(userFound);
      navigate(
        userFound.role === "propietario"
          ? "/propietario/inicio"
          : "/empleado/inicioEmpleado"
      );
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      {/* Sección superior (Hero con wave) */}
      <div className="login-hero">
        <img src={logo} alt="HandicApp Logo" className="app-logo" />

        {/* Wave */}
        <div className="wave-container">
          <svg
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            className="wave-svg"
          >
            <path
              fill="#fff"
              d="M0,160 C360,80 1080,240 1440,160 L1440,200 L0,200Z"
            />
          </svg>
        </div>
      </div>

      {/* Tarjeta de login */}
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Ingresar
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
