import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaUser,
  FaHome,
  FaDollarSign,
  FaCalendarAlt,
  FaChartBar,
  FaClipboardList,
  FaThLarge,
  FaQrcode
} from "react-icons/fa";
import "./Navbar.css";
import LogoPNG3 from "../assets/LogoPNG3.png"; // Ajusta la ruta de tu logo
import QRScannerModal from "./QRScanner"; // Ajusta la ruta según tu estructura

const Navbar = ({ user }) => {
  // Depuración: muestra en consola el objeto user
  console.log("Navbar user:", user);

  const location = useLocation();
  const navigate = useNavigate();

  // Si no se pasa user, no renderizamos nada
  if (!user) return null;

  // URL de imagen por defecto en caso de que user.photo esté vacía o sea undefined
  const defaultPhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const avatarSrc =
    user.photo && user.photo.trim() !== ""
      ? user.photo
      : defaultPhoto;

  // Estados para manejar responsividad, menú lateral, dropdown y modal QR
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
        setIsOpen(true);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setDropdownOpen(false);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
      setDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Función para procesar el resultado del escaneo QR
  const handleQRScan = (data) => {
    console.log("QR Data:", data);
    if (user.role === "propietario") {
      navigate(`/propietario/caballo/${data}`);
    } else {
      navigate(`/empleado/ejemplar/${data}`);
    }
  };

  // Definición de los ítems de navegación según el rol
  let navItems =
    user.role === "propietario"
      ? [
          { name: "Inicio", path: "/propietario/inicio", icon: <FaHome /> },
          { name: "Ejemplar", path: "/propietario/caballos", icon: <FaThLarge /> },
          { name: "Inversiones", path: "/propietario/inversiones", icon: <FaDollarSign /> },
          { name: "Calendario", path: "/propietario/calendario", icon: <FaCalendarAlt /> },
          { name: "Reportes", path: "/propietario/estadisticas", icon: <FaChartBar /> }
        ]
      : [
          { name: "Inicio", path: "/empleado/inicioEmpleado", icon: <FaHome /> },
          { name: "Ejemplar", path: "/empleado/caballosEmpleado", icon: <FaThLarge /> },
          { name: "Registros", path: "/empleado/consumosEmpleado", icon: <FaClipboardList /> },
          { name: "Calendario", path: "/empleado/calendarioEmpleado", icon: <FaCalendarAlt /> },
          { name: "Reportes", path: "/empleado/estadisticasEmpleado", icon: <FaChartBar /> }
        ];

  // Agregar el ítem de QR para ambos roles
  navItems.push({
    name: "QR Carga Rápida",
    action: () => setQrModalOpen(true),
    icon: <FaQrcode />
  });

  const perfilPath =
    user.role === "propietario"
      ? "/propietario/perfil"
      : "/empleado/perfilEmpleado";

  const notificacionesPath =
    user.role === "propietario"
      ? "/propietario/notificaciones"
      : "/empleado/notificacionesEmpleado";

  const displayRole = user.role === "propietario" ? "Dueño" : "Empleado";

  return (
    <div className="navbar-container">
      {/* ===================== TOPBAR ===================== */}
      <div className="navbar-topbar">
        <div className="topbar-left">
          <div className="topbar-toggle" onClick={toggleSidebar}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
          <div className="topbar-logo">
            <img src={LogoPNG3} alt="Logo" />
          </div>
        </div>
        <div className="topbar-right">
          <Link to={notificacionesPath} className="topbar-icon">
            <FaBell />
          </Link>
          <div className="topbar-user" onClick={toggleDropdown}>
            <FaUser />
            {dropdownOpen && (
              <div className="topbar-dropdown">
                <Link to={perfilPath} onClick={() => setDropdownOpen(false)}>
                  Perfil
                </Link>
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay para móvil */}
      {isMobile && isOpen && (
        <div className="navbar-overlay" onClick={closeSidebar}></div>
      )}

      {/* ===================== MENÚ LATERAL ===================== */}
      <div className={`navbar-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-user-info">
          <div className="drawer-user-avatar">
            <img
              src={avatarSrc}
              alt="Avatar"
              className="drawer-user-avatar-img"
            />
          </div>
          <div className="drawer-user-details">
            <div className="drawer-user-name">
              {user.name || "Nombre Apellido"}
            </div>
            <div className="drawer-user-role">Perfil: {displayRole}</div>
          </div>
        </div>

        <ul className="drawer-menu">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`drawer-menu-item ${
                item.path && location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.action ? (
                <button
                  onClick={() => {
                    item.action();
                    if (isMobile) setIsOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-text">{item.name}</span>
                </button>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => {
                    if (isMobile) setIsOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-text">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Modal QR */}
      {qrModalOpen && (
        <QRScannerModal
          isOpen={qrModalOpen}
          onClose={() => setQrModalOpen(false)}
          onScan={handleQRScan}
        />
      )}
    </div>
  );
};

export default Navbar;
