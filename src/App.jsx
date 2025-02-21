import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";

import InicioPropietario from "./pages/propietario/inicio";
import PerfilPropietario from "./pages/propietario/perfil";
import CaballosPropietario from "./pages/propietario/caballos";
import CalendarioPropietario from "./pages/propietario/calendario";
import InversionesPropietario from "./pages/propietario/inversiones";
import EstadisticasPropietario from "./pages/propietario/estadisticas";
import NotificacionesPropietario from "./pages/propietario/notificaciones";

import InicioEmpleado from "./pages/empleado/inicioEmpleado";
import PerfilEmpleado from "./pages/empleado/perfilEmpleado";
import CaballoEmpleado from "./pages/empleado/caballosEmpleado";
import CalendarioEmpleado from "./pages/empleado/calendarioEmpleado";
import InversionesEmpleado from "./pages/empleado/inversionesEmpleado";
import EstadisticasEmpleado from "./pages/empleado/estadisticasEmpleado";
import NotificacionesEmpleado from "./pages/empleado/notificacionesEmpleado";


const App = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (!storedUser) {
      navigate("/login"); // 🔥 Si no hay usuario, redirigir a login en cualquier ruta
    } else if (!user || user.username !== storedUser.username) {
      setUser(storedUser); // 🔥 Asegurar que user siempre coincida con localStorage
    }
  }, [navigate, location.pathname]);

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && user && <Header />}
      {!isLoginPage && user && <Navbar user={user} />} 

      <div className="container">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          
          {/* 🔥 Rutas de Propietario */}
          {user?.role === "propietario" && (
            <>
              <Route path="/propietario/inicio" element={<InicioPropietario />} />
              <Route path="/propietario/perfil" element={<PerfilPropietario />} />
              <Route path="/propietario/caballos" element={<CaballosPropietario />} />
              <Route path="/propietario/calendario" element={<CalendarioPropietario />} />
              <Route path="/propietario/inversiones" element={<InversionesPropietario />} />
              <Route path="/propietario/estadisticas" element={<EstadisticasPropietario />} />
              <Route path="/propietario/notificaciones" element={<NotificacionesPropietario />} />
            </>
          )}

          {/* 🔥 Rutas de Empleado */}
          {user?.role === "empleado" && (
            <>
              <Route path="/empleado/inicioEmpleado" element={<InicioEmpleado />} />
              <Route path="/empleado/perfilEmpleado" element={<PerfilEmpleado />} />
              <Route path="/empleado/caballosEmpleado" element={<CaballoEmpleado />} />
              <Route path="/empleado/calendarioEmpleado" element={<CalendarioEmpleado />} />
              <Route path="/empleado/inversionesEmpleado" element={<InversionesEmpleado />} />
              <Route path="/empleado/estadisticasEmpleado" element={<EstadisticasEmpleado />} />
              <Route path="/empleado/notificacionesEmpleado" element={<NotificacionesEmpleado />} />
            </>
          )}

          {/* 🔥 Redirigir cualquier otra ruta al login */}
          <Route path="*" element={<Login setUser={setUser} />} />
        </Routes>
      </div>

      {!isLoginPage && user && <Footer />}
    </>
  );
};

export default App;
