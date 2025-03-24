import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./estadisticas.css";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Estadisticas = () => {
  const [events, setEvents] = useState([]);
  const [horses, setHorses] = useState([]);

  // Estados para filtros
  const [filterHorse, setFilterHorse] = useState("Todos");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  // Cargar eventos y caballos desde localStorage (o usar datos de ejemplo)
  useEffect(() => {
    const storedEvents = localStorage.getItem("eventsCalendario");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      const initialEvents = [
        {
          id: "1",
          title: "Revisión Veterinaria - Bella",
          date: "2025-02-15",
          category: "Veterinaria",
          horse: "Bella",
          cost: 1000,
        },
        {
          id: "2",
          title: "Competencia - Caballo Rápido",
          date: "2025-02-18",
          category: "Competición",
          horse: "Caballo Rápido",
          cost: 2000,
        },
        {
          id: "3",
          title: "Vacunación - Estrella",
          date: "2025-02-20",
          category: "Vacunación",
          horse: "Estrella",
          cost: 500,
        },
      ];
      setEvents(initialEvents);
    }

    const storedHorses = localStorage.getItem("caballosData");
    if (storedHorses) {
      setHorses(JSON.parse(storedHorses));
    } else {
      setHorses([]);
    }
  }, []);

  // Filtrar eventos según los filtros seleccionados
  const filteredEvents = events.filter((ev) => {
    let valid = true;
    if (filterHorse !== "Todos") {
      valid = valid && ev.horse === filterHorse;
    }
    if (filterStartDate) {
      valid = valid && new Date(ev.date) >= new Date(filterStartDate);
    }
    if (filterEndDate) {
      valid = valid && new Date(ev.date) <= new Date(filterEndDate);
    }
    return valid;
  });

  // Cálculos basados en los eventos filtrados
  const totalEvents = filteredEvents.length;
  const totalIncome = filteredEvents.reduce(
    (sum, event) => sum + Number(event.cost),
    0
  );
  const averageIncome =
    totalEvents > 0 ? (totalIncome / totalEvents).toFixed(2) : 0;
  const totalHorses = horses.length;

  const now = new Date();
  const upcomingEvents = filteredEvents.filter(
    (ev) => new Date(ev.date) >= now
  );
  const pastEvents = filteredEvents.filter((ev) => new Date(ev.date) < now);
  const upcomingEventsCount = upcomingEvents.length;
  const pastEventsCount = pastEvents.length;
  const projectedIncomeUpcoming = upcomingEvents.reduce(
    (sum, ev) => sum + Number(ev.cost),
    0
  );

  // Agrupar eventos por categoría para los gráficos
  const categories = {};
  filteredEvents.forEach((event) => {
    const cat = event.category;
    categories[cat] = (categories[cat] || 0) + 1;
  });
  const categoryLabels = Object.keys(categories);
  const categoryData = Object.values(categories);

  // Gráfico de barras: cantidad de eventos por categoría
  const dataBar = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Eventos por Categoría",
        data: categoryData,
        backgroundColor: "#667eea",
      },
    ],
  };

  const optionsBar = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  // Gráfico de pastel: distribución porcentual de eventos
  const pieColors = ["#667eea", "#764ba2", "#f6ad55", "#48bb78", "#f56565"];
  const dataPie = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryData,
        backgroundColor: categoryLabels.map(
          (_, index) => pieColors[index % pieColors.length]
        ),
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="estadisticas-bg">
      <div className="estadisticas-container">
        <h2 className="titulo">Estadísticas del Propietario</h2>
        <p className="subtitulo">
          Información integral para la gestión y control de la operación.
        </p>

        {/* Filtros */}
        <div className="filtros-container">
          <div className="filtro">
            <label>Filtrar por Caballo:</label>
            <select
              value={filterHorse}
              onChange={(e) => setFilterHorse(e.target.value)}
            >
              <option value="Todos">Todos</option>
              {horses.map((horse) => (
                <option key={horse.id} value={horse.nombre}>
                  {horse.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="filtro">
            <label>Fecha desde:</label>
            <input
              type="date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
            />
          </div>
          <div className="filtro">
            <label>Fecha hasta:</label>
            <input
              type="date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setFilterHorse("Todos");
              setFilterStartDate("");
              setFilterEndDate("");
            }}
          >
            Limpiar Filtros
          </button>
        </div>

        {/* Resumen de métricas */}
        <div className="tarjeta-resumen">
          <div className="metric">
            <h3>Total de Eventos Programados</h3>
            <p>{totalEvents}</p>
          </div>
          <div className="metric">
            <h3>Eventos Próximos</h3>
            <p>{upcomingEventsCount}</p>
          </div>
          <div className="metric">
            <h3>Eventos Pasados</h3>
            <p>{pastEventsCount}</p>
          </div>
          <div className="metric">
            <h3>Ingresos Totales Estimados</h3>
            <p>${totalIncome}</p>
          </div>
          <div className="metric">
            <h3>Ingreso Promedio por Evento</h3>
            <p>${averageIncome}</p>
          </div>
          <div className="metric">
            <h3>Ingreso Proyectado (Próximos Eventos)</h3>
            <p>${projectedIncomeUpcoming}</p>
          </div>
          <div className="metric">
            <h3>Total de Caballos Registrados</h3>
            <p>{totalHorses}</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="tarjeta-grafica">
          <h3>Eventos por Categoría (Barra)</h3>
          <Bar data={dataBar} options={optionsBar} />
        </div>

        <div className="tarjeta-grafica">
          <h3>Distribución de Eventos por Categoría (Pastel)</h3>
          <Pie data={dataPie} options={optionsPie} />
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
