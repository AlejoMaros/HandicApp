import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHorse,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCamera,
  FaTasks,
  FaChartBar,
  FaBell,
} from "react-icons/fa";
import "./inicioEmpleado.css";

// OPCIONAL: Para un placeholder de gráfica (BarChart demo),
// podrías usar 'react-chartjs-2' con Chart.js. Lo ilustro abajo.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar componentes de Chart.js (necesario si usas react-chartjs-2).
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InicioEmpleado = () => {
  const navigate = useNavigate();

  // Datos ficticios para la gráfica
  const dataBar = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [
      {
        label: "Gastos diarios ($)",
        data: [500, 300, 200, 400, 700, 0, 100], // demo
        backgroundColor: "#667eea",
      },
    ],
  };
  const optionsBar = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Ejemplo de datos “últimos gastos” en modo demo
  const [ultimosGastos] = useState([
    { id: 1, fecha: "2025-03-10", categoria: "Alimentación", monto: 200 },
    { id: 2, fecha: "2025-03-09", categoria: "Veterinario", monto: 500 },
    { id: 3, fecha: "2025-03-08", categoria: "Transporte", monto: 300 },
  ]);

  return (
    <div className="inicio-empleado">
      <h1 className="titulo">Panel del Empleado</h1>
      <p className="subtitulo">
        Bienvenido/a. Aquí puedes gestionar el cuidado y registro diario de los
        caballos de manera eficiente.
      </p>

      {/* Contenedor principal en formato grid */}
      <div className="inicio-layout">
        {/* Columna Izquierda */}
        <div className="col-izquierda">
          {/* Tarjeta: Actividades Pendientes */}
          <div className="tarjeta resumen">
            <h2>
              <FaTasks /> Actividades Pendientes
            </h2>
            <ul>
              <li>
                🏇 <strong>3</strong> entrenamientos sin registrar
              </li>
              <li>
                💉 <strong>1</strong> vacuna programada para hoy
              </li>
              <li>
                📸 <strong>5</strong> fotos pendientes de subir
              </li>
              <li>
                💰 <strong>2</strong> gastos sin registrar
              </li>
            </ul>
          </div>

          {/* Tarjeta: Estadísticas + pequeña gráfica */}
          <div className="tarjeta dashboard">
            <h2>
              <FaChartBar /> Estadísticas
            </h2>

            <div className="estadisticas-grid">
              {/* Bloques de datos rápidos */}
              <div className="dato">
                <p>🏇 Caballos en entrenamiento</p>
                <span>5</span>
              </div>
              <div className="dato">
                <p>💰 Gastos este mes</p>
                <span>$10,000</span>
              </div>
              <div className="dato">
                <p>💉 Última vacuna aplicada</p>
                <span>Hace 3 días</span>
              </div>
            </div>

            {/* Mini-gráfica */}
            <div className="grafica">
              <Bar data={dataBar} options={optionsBar} />
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="col-derecha">
          {/* Tarjeta: Accesos Rápidos */}
          <div className="tarjeta accesos-rapidos">
            <h2>
              <FaHorse /> Accesos Rápidos
            </h2>
            <div className="botones">
              <button onClick={() => navigate("/empleado/caballos")}>
                <FaHorse /> Ver Caballos
              </button>
              <button onClick={() => navigate("/empleado/calendario")}>
                <FaCalendarAlt /> Calendario
              </button>
              <button onClick={() => navigate("/empleado/gastos")}>
                <FaMoneyBillWave /> Registrar Gastos
              </button>
              <button onClick={() => navigate("/empleado/fotos")}>
                <FaCamera /> Subir Fotos
              </button>
            </div>
          </div>

          {/* Tarjeta: Últimos Gastos */}
          <div className="tarjeta ultimos-gastos">
            <h2>
              <FaMoneyBillWave /> Últimos Gastos
            </h2>
            {ultimosGastos.length === 0 ? (
              <p>No hay gastos recientes.</p>
            ) : (
              <ul className="lista-gastos">
                {ultimosGastos.map((g) => (
                  <li key={g.id}>
                    <span className="categoria">{g.categoria}</span>{" "}
                    <span className="fecha">({g.fecha})</span> -{" "}
                    <span className="monto"> ${g.monto}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tarjeta: Notificaciones (ejemplo) */}
          <div className="tarjeta notificaciones">
            <h2>
              <FaBell /> Notificaciones
            </h2>
            <p>Por ahora no tienes notificaciones.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioEmpleado;
