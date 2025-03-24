import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaChartBar,
  FaMoneyBillWave,
  FaHorse,
  FaCalendarAlt,
  FaBell,
  FaUser 
} from "react-icons/fa";
import "./inicio.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InicioPropietario = () => {
  const navigate = useNavigate();

  // Datos ficticios para la gráfica de tendencias financieras
  const dataFinancial = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Ingresos ($)",
        data: [5000, 7000, 6000, 8000, 7500, 9000],
        backgroundColor: "#667eea",
      },
      {
        label: "Gastos ($)",
        data: [3000, 4000, 3500, 4500, 4000, 5000],
        backgroundColor: "#f56565",
      },
    ],
  };

  const optionsFinancial = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Datos rápidos (dummy)
  const totalIngresos = 50000;
  const totalGastos = 20000;
  const balance = totalIngresos - totalGastos;
  const totalCaballos = 25;
  const proximosEventos = 3;
  const alertasCriticas = 1;

  // Dummy para últimas notificaciones
  const ultimasNotificaciones = [
    { id: 1, message: "Informe financiero disponible.", date: "2025-03-14" },
    { id: 2, message: "Nuevo caballo registrado: Estrella.", date: "2025-03-13" },
    { id: 3, message: "Recordatorio: Revisión veterinaria en 2 días.", date: "2025-03-12" },
  ];

  return (
    <div className="inicio-propietario">
      <h1 className="titulo">Panel del Propietario</h1>
      <p className="subtitulo">
        Bienvenido. Aquí tienes un resumen integral de tu negocio.
      </p>

      <div className="inicio-layout">
        {/* Columna Izquierda: Resumen, Indicadores y Gráfica */}
        <div className="col-izquierda">
          {/* Tarjeta: Resumen Financiero */}
          <div className="tarjeta resumen-financiero">
            <h2>
              <FaMoneyBillWave /> Resumen Financiero
            </h2>
            <ul>
              <li>
                <strong>Ingresos Totales:</strong> ${totalIngresos}
              </li>
              <li>
                <strong>Gastos Totales:</strong> ${totalGastos}
              </li>
              <li>
                <strong>Balance:</strong> ${balance}
              </li>
            </ul>
          </div>

          {/* Tarjeta: Indicadores Clave */}
          <div className="tarjeta indicadores">
            <h2>
              <FaChartBar /> Indicadores Clave
            </h2>
            <ul>
              <li>
                🐴 Total de Caballos: <strong>{totalCaballos}</strong>
              </li>
              <li>
                📅 Próximos Eventos: <strong>{proximosEventos}</strong>
              </li>
              <li>
                ⚠️ Alertas Críticas: <strong>{alertasCriticas}</strong>
              </li>
            </ul>
          </div>

          {/* Tarjeta: Gráfica de Tendencias Financieras */}
          <div className="tarjeta grafica-financiera">
            <h2>
              <FaChartBar /> Tendencias Financieras
            </h2>
            <div className="grafica">
              <Bar data={dataFinancial} options={optionsFinancial} />
            </div>
          </div>
        </div>

        {/* Columna Derecha: Accesos Rápidos y Últimas Notificaciones */}
        <div className="col-derecha">
          {/* Tarjeta: Accesos Rápidos */}
          <div className="tarjeta accesos-rapidos">
            <h2>
              <FaUser /> Accesos Rápidos
            </h2>
            <div className="botones">
              <button onClick={() => navigate("/propietario/estadisticas")}>
                <FaChartBar /> Estadísticas
              </button>
              <button onClick={() => navigate("/propietario/caballos")}>
                <FaHorse /> Caballos
              </button>
              <button onClick={() => navigate("/propietario/calendario")}>
                <FaCalendarAlt /> Calendario
              </button>
              <button onClick={() => navigate("/propietario/finanzas")}>
                <FaMoneyBillWave /> Finanzas
              </button>
              <button onClick={() => navigate("/propietario/notificaciones")}>
                <FaBell /> Notificaciones
              </button>
              <button onClick={() => navigate("/propietario/perfil")}>
                <FaUser /> Perfil
              </button>
            </div>
          </div>

          {/* Tarjeta: Últimas Notificaciones */}
          <div className="tarjeta ultimas-notificaciones">
            <h2>
              <FaBell /> Últimas Notificaciones
            </h2>
            {ultimasNotificaciones.length === 0 ? (
              <p>No hay notificaciones recientes.</p>
            ) : (
              <ul className="lista-notificaciones">
                {ultimasNotificaciones.map((notif) => (
                  <li key={notif.id}>
                    <span className="mensaje">{notif.message}</span>
                    <span className="fecha">({notif.date})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioPropietario;
