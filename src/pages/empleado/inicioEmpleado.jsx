import React, { useState } from "react";
import Select from "react-select";
import { FaTasks, FaPen, FaSyncAlt } from "react-icons/fa";
import "./inicioEmpleado.css";

// Ejemplo de caballos que administra el empleado
const horses = [
  { id: 1, nombre: "Caballo 1" },
  { id: 2, nombre: "Caballo 2" },
  { id: 3, nombre: "Caballo 3" },
  { id: 4, nombre: "Caballo 4" },
];

// Convertimos las opciones al formato que usa react-select
const horseOptions = horses.map((h) => ({
  value: h.id,
  label: h.nombre,
}));

const InicioEmpleado = () => {
  const [observacion, setObservacion] = useState("");
  const [caballosSeleccionados, setCaballosSeleccionados] = useState([]);

  const handleSeleccionMultiple = (selectedOptions) => {
    // selectedOptions será un arreglo de objetos {value, label}
    setCaballosSeleccionados(selectedOptions || []);
  };

  const handleAgregarObservacion = () => {
    if (caballosSeleccionados.length === 0) {
      alert("Por favor, selecciona al menos un caballo.");
      return;
    }
    const nombres = caballosSeleccionados.map((opt) => opt.label);
    alert(`Observación para ${nombres.join(", ")}:\n\n${observacion}`);
    setObservacion("");
    setCaballosSeleccionados([]);
  };

  const handleActualizar = () => {
    alert("Datos actualizados");
  };

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="inicio-empleado">
      <header className="header">
        <h1 className="titulo">Panel Haras caballerizas</h1>
        <p className="subtitulo">
          Bienvenido/a. Aqui puede gestionar el cuidado y registros diario de manera eficiente.
        </p>
      </header>

      <main className="contenido">
        {/* Tarjetas superiores */}
        <div className="tarjeta resumen-diario top-card">
          <h2>Resumen Diario</h2>
          <p>Hoy es {today}</p>
          <ul>
            <li>Entrenamientos pendientes: 3</li>
            <li>Vacunas programadas: 1</li>
            <li>Fotos por subir: 5</li>
          </ul>
          <button className="btn-actualizar" onClick={handleActualizar}>
            <FaSyncAlt /> Actualizar
          </button>
        </div>

        <div className="tarjeta actividad-pendiente top-card">
          <h2>
            <FaTasks /> Actividades Pendientes
          </h2>
          <ul>
            <li>🏇 3 entrenamientos sin registrar</li>
            <li>💉 1 vacuna programada para hoy</li>
            <li>📸 5 fotos pendientes de subir</li>
            <li>💰 2 gastos sin registrar</li>
          </ul>
        </div>

        {/* Tarjeta de Registro de Observaciones */}
        <div className="tarjeta registro-observacion">
          <h2>
            <FaPen /> Registro de Observaciones
          </h2>
          <div className="form-observacion">
            <p className="instrucciones">
              Selecciona uno o varios caballos a los que asignar la observación:
            </p>
            <Select
              className="select-caballos"
              options={horseOptions}
              isMulti
              placeholder="Buscar caballos..."
              value={caballosSeleccionados}
              onChange={handleSeleccionMultiple}
            />
            <textarea
              placeholder="Agrega aquí tu observación rápida..."
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
            />
            <button className="btn-observacion" onClick={handleAgregarObservacion}>
              Agregar Observación
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InicioEmpleado;
