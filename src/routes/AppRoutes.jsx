import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import InicioPropietario from "../pages/propietario/inicio";
import InicioEmpleado from "../pages/empleado/inicioEmpleado";

const AppRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser && location.pathname !== "/login") {
      navigate("/login");
    } else {
      setUser(storedUser);
    }

    setLoading(false);
  }, [navigate, location.pathname]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      {user?.role === "propietario" && <Route path="/propietario/inicio" element={<InicioPropietario />} />}
      {user?.role === "empleado" && <Route path="/empleado/inicioEmpleado" element={<InicioEmpleado />} />}
      <Route path="*" element={<Login setUser={setUser} />} />
    </Routes>
  );
};

export default AppRoutes;
