import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/LogoPNG2.png"; 

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <div className="login-container">
      <div className="left-section">
        <div className="wave-bg">
          <svg className="wave" viewBox="0 0 500 500" preserveAspectRatio="none">
            <path d="M0,100 C150,200 350,0 500,100 L500,0 L0,0 Z" />
          </svg>
        </div>
        <div className="left-content">
          <img src={logo} alt="HadicApp Logo" className="logo" />
        </div>
      </div>

      <div className="right-section">
        <div className="form-wrapper">
          <h3 className="title">Bienvenido</h3>
          <p className="subtitle">Inicia sesión en tu cuenta para continuar</p>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#!" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
            <button type="submit" className="login-button">
              Ingresar
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <p className="signup">
            ¿No tienes una cuenta? <a href="#!">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
