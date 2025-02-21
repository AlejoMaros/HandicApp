import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaKey, FaShieldAlt } from "react-icons/fa";
import "./perfilEmpleado.css";

const PerfilEmpleado = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("misDatos");

  // Form para editar datos personales
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  
  // Para cambiar contraseña en 'Configuración'
  const [newPassword, setNewPassword] = useState("");
  // Para el 2FA (demo)
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      let profileData = JSON.parse(localStorage.getItem("profileEmpleado"));
      if (!profileData) {
        profileData = {
          username: storedUser.username || "Empleado",
          role: storedUser.role || "empleado",
          email: "usuario@ejemplo.com",
          phone: "+123456789",
          location: "Ciudad, País",
          avatar: "",
          horses: [
            { name: "Bella", breed: "Árabe", age: 5 },
            { name: "Luna", breed: "Cuarto de Milla", age: 8 },
            { name: "Estrella", breed: "Andaluza", age: 6 },
          ],
        };
        localStorage.setItem("profileEmpleado", JSON.stringify(profileData));
      }

      setUser(profileData);
      setEditEmail(profileData.email);
      setEditPhone(profileData.phone);
      setEditLocation(profileData.location);
      setEditAvatar(profileData.avatar || "");
    } else {
      window.location.href = "/login";
    }
  }, []);

  if (!user) {
    return (
      <div className="perfil-bg">
        <p style={{ color: "#fff", textAlign: "center" }}>Cargando perfil...</p>
      </div>
    );
  }

  /* =====================
     GUARDAR DATOS
  ====================== */
  const handleGuardarDatosPersonales = () => {
    const updated = {
      ...user,
      email: editEmail,
      phone: editPhone,
      location: editLocation,
      avatar: editAvatar,
    };
    localStorage.setItem("profileEmpleado", JSON.stringify(updated));
    setUser(updated);
    alert("Datos personales guardados.");
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setEditAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleGuardarPassword = () => {
    alert("Contraseña cambiada (demo). Nueva password: " + newPassword);
    setNewPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profileEmpleado");
    window.location.href = "/login";
  };

  /* =====================
     2FA DEMO
  ====================== */
  const handleToggle2FA = () => {
    setTwoFAEnabled(!twoFAEnabled);
    alert(
      !twoFAEnabled
        ? "2FA Activado (demo)."
        : "2FA Desactivado (demo)."
    );
  };

  return (
    <div className="perfil-bg">
      <div className="perfil-container">
        {/* Tarjeta de Perfil */}
        <div className="perfil-card">
          <div className="perfil-header">
            <img
              src={
                user.avatar && user.avatar !== ""
                  ? user.avatar
                  : "https://via.placeholder.com/120"
              }
              alt="Perfil"
              className="perfil-avatar"
            />
            <h2>{user.username}</h2>
            <p className="perfil-role">{user.role}</p>
          </div>
        </div>

        {/* Pestañas de Sección */}
        <div className="perfil-tabs">
          <button
            onClick={() => setActiveTab("misDatos")}
            className={activeTab === "misDatos" ? "active" : ""}
          >
            Datos Personales
          </button>
          <button
            onClick={() => setActiveTab("configuracion")}
            className={activeTab === "configuracion" ? "active" : ""}
          >
            Configuración
          </button>
          <button
            onClick={() => setActiveTab("misCaballos")}
            className={activeTab === "misCaballos" ? "active" : ""}
          >
            Mis Caballos
          </button>
          <button
            onClick={() => setActiveTab("seguridad")}
            className={activeTab === "seguridad" ? "active" : ""}
          >
            Seguridad
          </button>
        </div>

        {/* Contenido de las Pestañas */}
        <div className="perfil-content">
          {/* ===== Datos Personales ===== */}
          {activeTab === "misDatos" && (
            <div className="perfil-section">
              <h3>Información Personal</h3>
              <label>
                Email:
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </label>
              <label>
                Teléfono:
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />
              </label>
              <label>
                Ubicación:
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                />
              </label>
              <label>
                Cambiar Avatar:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChangeAvatar}
                />
              </label>
              {editAvatar && (
                <img
                  src={editAvatar}
                  alt="preview avatar"
                  style={{ width: "80px", margin: "0.5rem" }}
                />
              )}
              <button className="btn-save" onClick={handleGuardarDatosPersonales}>
                Guardar
              </button>
            </div>
          )}

          {/* ===== Configuración ===== */}
          {activeTab === "configuracion" && (
            <div className="perfil-section">
              <h3>Configuración</h3>
              <label>Cambiar Contraseña:</label>
              <input
                type="password"
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="btn-save" onClick={handleGuardarPassword}>
                Guardar
              </button>

              <label>Idioma:</label>
              <select>
                <option>Español</option>
                <option>Inglés</option>
                <option>Portugués</option>
              </select>
            </div>
          )}

          {/* ===== Mis Caballos ===== */}
          {activeTab === "misCaballos" && (
            <div className="perfil-section">
              <h3>Mis Caballos</h3>
              {user.horses && user.horses.length > 0 ? (
                <ul className="caballos-lista">
                  {user.horses.map((horse, index) => (
                    <li key={index} className="caballo-item">
                      🐴 {horse.name} - {horse.breed} ({horse.age} años)
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tienes caballos asignados.</p>
              )}
            </div>
          )}

          {/* ===== Seguridad ===== */}
          {activeTab === "seguridad" && (
            <div className="perfil-section">
              <h3>Seguridad</h3>
              <button className="btn-danger" onClick={handleLogout}>
                <FaSignOutAlt /> Cerrar Sesión
              </button>
              <button className="btn-secure" onClick={handleToggle2FA}>
                <FaShieldAlt /> {twoFAEnabled ? "Desactivar 2FA" : "Activar 2FA"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilEmpleado;
