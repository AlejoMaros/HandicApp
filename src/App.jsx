import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Ajusta o quita si no usas Footer
import Login from "./pages/Login";

// Páginas para usuario Propietario
import InicioPropietario from "./pages/propietario/inicio";
import PerfilPropietario from "./pages/propietario/perfil";
import CaballosPropietario from "./pages/propietario/caballos";
import CalendarioPropietario from "./pages/propietario/calendario";
import InversionesPropietario from "./pages/propietario/inversiones";
import EstadisticasPropietario from "./pages/propietario/estadisticas";
import NotificacionesPropietario from "./pages/propietario/notificaciones";

// Páginas para usuario Empleado
import InicioEmpleado from "./pages/empleado/inicioEmpleado";
import PerfilEmpleado from "./pages/empleado/perfilEmpleado";
import CaballoEmpleado from "./pages/empleado/caballosEmpleado";
import CaballoEmpleadoDetalle from "./pages/empleado/caballoEmpleadoDetalle";
import CalendarioEmpleado from "./pages/empleado/calendarioEmpleado";
import ConsumosEmpleado from "./pages/empleado/consumosEmpleado";
import EstadisticasEmpleado from "./pages/empleado/estadisticasEmpleado";
import NotificacionesEmpleado from "./pages/empleado/notificacionesEmpleado";

const App = () => {
  // Estado local para el usuario (lo toma de localStorage)
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Verifica si hay usuario en localStorage y redirige a /login si no existe
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else if (!user || user.username !== storedUser.username) {
      setUser(storedUser);
    }
  }, [navigate, location.pathname, user]);

  // Determina si la ruta actual es /login
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {/* Navbar: se muestra si no estamos en login y hay un usuario */}
      {!isLoginPage && user && <Navbar user={user} />}

      {isLoginPage ? (
        // Página de login
        <Login setUser={setUser} />
      ) : (
        // Contenedor principal; en desktop se corre a la derecha (ver .main-content en App.css)
        <div className="main-content">
          <Routes>
            {/* Rutas para usuario Propietario */}
            <Route path="/propietario/inicio" element={<InicioPropietario />} />
            <Route path="/propietario/perfil" element={<PerfilPropietario />} />
            <Route path="/propietario/caballos" element={<CaballosPropietario />} />
            <Route path="/propietario/calendario" element={<CalendarioPropietario />} />
            <Route path="/propietario/inversiones" element={<InversionesPropietario />} />
            <Route path="/propietario/estadisticas" element={<EstadisticasPropietario />} />
            <Route path="/propietario/notificaciones" element={<NotificacionesPropietario />} />

            {/* Rutas para usuario Empleado */}
            <Route path="/empleado/inicioEmpleado" element={<InicioEmpleado />} />
            <Route path="/empleado/perfilEmpleado" element={<PerfilEmpleado />} />
            <Route path="/empleado/caballosEmpleado" element={<CaballoEmpleado />} />
            <Route path="/empleado/caballoDetalle/:id" element={<CaballoEmpleadoDetalle />} />
            <Route path="/empleado/calendarioEmpleado" element={<CalendarioEmpleado />} />
            <Route path="/empleado/consumosEmpleado" element={<ConsumosEmpleado />} />
            <Route path="/empleado/estadisticasEmpleado" element={<EstadisticasEmpleado />} />
            <Route path="/empleado/notificacionesEmpleado" element={<NotificacionesEmpleado />} />
          </Routes>
        </div>
      )}


    </>
  );
};

export default App;
