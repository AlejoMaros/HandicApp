import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./EstadisticasEmpleado.css";

// Registrar componentes de Chart.js:
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EstadisticasEmpleado = () => {
  // Datos ficticios para la gráfica de entrenamientos diarios
  const dataEntrenamientos = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [
      {
        label: "Entrenamientos Realizados",
        data: [3, 2, 4, 1, 3, 5, 2], // Ejemplo
        backgroundColor: "#667eea",
      },
    ],
  };

  const optionsEntrenamientos = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Métricas simples (ejemplo)
  const [stats] = useState({
    entrenamientosSemana: 20,
    caballosAtendidosHoy: 5,
    vacunacionesPendientes: 1,
  });

  return (
    <div className="estadisticas-empleado-bg">
      <div className="estadisticas-empleado-container">
        <h2 className="titulo">Estadísticas Operativas</h2>
        <p className="subtitulo">
          Indicadores de tu desempeño y tareas realizadas recientemente.
        </p>

        {/* Resumen de métricas */}
        <div className="tarjeta-resumen">
          <div className="metric">
            <h3>Entrenamientos en la última semana</h3>
            <p>{stats.entrenamientosSemana}</p>
          </div>
          <div className="metric">
            <h3>Caballos atendidos hoy</h3>
            <p>{stats.caballosAtendidosHoy}</p>
          </div>
          <div className="metric">
            <h3>Vacunaciones pendientes</h3>
            <p>{stats.vacunacionesPendientes}</p>
          </div>
        </div>

        {/* Gráfica de entrenamientos diarios */}
        <div className="tarjeta-grafica">
          <h3>Entrenamientos diarios (última semana)</h3>
          <Bar data={dataEntrenamientos} options={optionsEntrenamientos} />
        </div>
      </div>
    </div>
  );
};

export default EstadisticasEmpleado;
