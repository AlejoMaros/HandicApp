import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaKey, FaShieldAlt } from "react-icons/fa";
import "./perfil.css";

const PerfilPropietario = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("misDatos");

  // Estados para editar datos personales
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  // Para cambiar contraseña
  const [newPassword, setNewPassword] = useState("");
  // Para el 2FA (demo)
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      let profileData = JSON.parse(localStorage.getItem("profilePropietario"));
      if (!profileData) {
        profileData = {
          username: storedUser.username || "Propietario",
          role: storedUser.role || "propietario",
          email: "propietario@ejemplo.com",
          phone: "+123456789",
          location: "Ciudad, País",
          avatar: "", // URL o base64
          horses: [
            { name: "Bella", breed: "Árabe", age: 5 },
            { name: "Luna", breed: "Cuarto de Milla", age: 8 },
            { name: "Estrella", breed: "Andaluza", age: 6 },
          ],
          financialSummary: {
            totalIncome: 5000,
            totalExpenses: 2000,
            balance: 3000,
          },
        };
        localStorage.setItem("profilePropietario", JSON.stringify(profileData));
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

  const handleGuardarDatosPersonales = () => {
    const updated = {
      ...user,
      email: editEmail,
      phone: editPhone,
      location: editLocation,
      avatar: editAvatar,
    };
    localStorage.setItem("profilePropietario", JSON.stringify(updated));
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

  const handleToggle2FA = () => {
    setTwoFAEnabled(!twoFAEnabled);
    alert(
      !twoFAEnabled
        ? "2FA Activado (demo)."
        : "2FA Desactivado (demo)."
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profilePropietario");
    window.location.href = "/login";
  };

  return (
    <div className="perfil-bg">
      <div className="perfil-container">
        {/* Tarjeta de Perfil */}
        <div className="perfil-card">
          <div className="perfil-header">
            <img
              src={user.avatar && user.avatar !== "" ? user.avatar : "https://via.placeholder.com/120"}
              alt="Perfil"
              className="perfil-avatar"
            />
            <h2>{user.username}</h2>
            <p className="perfil-role">
              {user.role === "propietario" ? "Propietario" : user.role}
            </p>
          </div>
        </div>

        {/* Pestañas */}
        <div className="perfil-tabs">
          <button
            onClick={() => setActiveTab("misDatos")}
            className={activeTab === "misDatos" ? "active" : ""}
          >
            Mis Datos
          </button>
          <button
            onClick={() => setActiveTab("finanzas")}
            className={activeTab === "finanzas" ? "active" : ""}
          >
            Finanzas
          </button>
          <button
            onClick={() => setActiveTab("caballos")}
            className={activeTab === "caballos" ? "active" : ""}
          >
            Caballos
          </button>
          <button
            onClick={() => setActiveTab("seguridad")}
            className={activeTab === "seguridad" ? "active" : ""}
          >
            Seguridad
          </button>
        </div>

        {/* Contenido de las pestañas */}
        <div className="perfil-content">
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
                <input type="file" accept="image/*" onChange={handleChangeAvatar} />
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

          {activeTab === "finanzas" && (
            <div className="perfil-section">
              <h3>Resumen Financiero</h3>
              <p>
                <strong>Ingresos Totales:</strong> ${user.financialSummary.totalIncome}
              </p>
              <p>
                <strong>Gastos Totales:</strong> ${user.financialSummary.totalExpenses}
              </p>
              <p>
                <strong>Balance:</strong> ${user.financialSummary.balance}
              </p>
            </div>
          )}

          {activeTab === "caballos" && (
            <div className="perfil-section">
              <h3>Caballos Registrados</h3>
              {user.horses && user.horses.length > 0 ? (
                <ul className="caballos-lista">
                  {user.horses.map((horse, index) => (
                    <li key={index} className="caballo-item">
                      🐴 {horse.name} - {horse.breed} ({horse.age} años)
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tienes caballos registrados.</p>
              )}
            </div>
          )}

          {activeTab === "seguridad" && (
            <div className="perfil-section">
              <h3>Seguridad</h3>
              <div className="seguridad-config">
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
              </div>
              <div className="seguridad-2fa">
                <button className="btn-secure" onClick={handleToggle2FA}>
                  <FaShieldAlt /> {twoFAEnabled ? "Desactivar 2FA" : "Activar 2FA"}
                </button>
              </div>
              <div className="seguridad-logout">
                <button className="btn-danger" onClick={handleLogout}>
                  <FaSignOutAlt /> Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilPropietario;
