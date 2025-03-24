import React, { useState, useEffect } from "react";
import { FaSearch, FaTrophy } from "react-icons/fa";
import "./inversiones.css";

const Inversiones = () => {
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [showIngresoModal, setShowIngresoModal] = useState(false);
  const [nuevoIngreso, setNuevoIngreso] = useState({
    fecha: "",
    caballo: "",
    monto: "",
    descripcion: "Ganancia por carrera",
  });

  /* Cargar datos al iniciar */
  useEffect(() => {
    const dataGastos = localStorage.getItem("gastosEmpleado");
    const dataIngresos = localStorage.getItem("ingresosPropietario");

    if (dataGastos) {
      setGastos(JSON.parse(dataGastos));
    }

    if (dataIngresos) {
      setIngresos(JSON.parse(dataIngresos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ingresosPropietario", JSON.stringify(ingresos));
  }, [ingresos]);

  /* FILTRO DE BÚSQUEDA */
  const registrosFiltrados = [...gastos, ...ingresos].filter((registro) =>
    registro.caballo.toLowerCase().includes(filtro.toLowerCase())
  );

  /* MANEJO DE INGRESOS */
  const handleOpenIngreso = () => {
    setNuevoIngreso({
      fecha: "",
      caballo: "",
      monto: "",
      descripcion: "Ganancia por carrera",
    });
    setShowIngresoModal(true);
  };

  const handleSaveIngreso = (e) => {
    e.preventDefault();
    const ingresoConId = { ...nuevoIngreso, id: Date.now(), monto: Number(nuevoIngreso.monto) };
    setIngresos([...ingresos, ingresoConId]);
    setShowIngresoModal(false);
  };

  const handleIngresoChange = (e) => {
    const { name, value } = e.target;
    setNuevoIngreso({ ...nuevoIngreso, [name]: value });
  };

  /* CÁLCULO DE TOTALES */
  const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);
  const totalIngresos = ingresos.reduce((acc, ingreso) => acc + ingreso.monto, 0);
  const balance = totalIngresos - totalGastos;

  return (
    <div className="inversiones-bg">
      <div className="inversiones-container">
        <h2 className="titulo">📊 Mis Inversiones</h2>
        <p className="subtitulo">
          Consulta los gastos de tus caballos y registra ganancias.
        </p>

        {/* Barra de filtro */}
        <div className="barra-busqueda">
          <FaSearch className="icono-busqueda" />
          <input
            type="text"
            className="filtro-input"
            placeholder="Buscar por caballo..."
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        {/* Botón para registrar ingreso */}
        <button className="btn-ganancias" onClick={handleOpenIngreso}>
          <FaTrophy /> Registrar Ganancia
        </button>

        {/* Tabla de inversiones */}
        <div className="tarjeta-gastos">
          <h3 className="tarjeta-titulo">Historial de Inversiones</h3>

          <table className="gastos-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Caballo</th>
                <th>Monto</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.fecha}</td>
                  <td>{registro.caballo}</td>
                  <td className={registro.monto > 0 ? "ingreso" : "gasto"}>
                    ${registro.monto}
                  </td>
                  <td>{registro.descripcion}</td>
                </tr>
              ))}
              {registrosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="4">No hay registros disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>

          <h3 className="total-gastado">Total Gastos: ${totalGastos}</h3>
          <h3 className="total-ingresos">Total Ingresos: ${totalIngresos}</h3>
          <h3 className="balance-final">Balance: ${balance}</h3>
        </div>
      </div>

      {/* Modal para registrar ingreso */}
      {showIngresoModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>🏆 Registrar Ganancia</h3>
            <form onSubmit={handleSaveIngreso}>
              <label>Fecha:</label>
              <input
                type="date"
                name="fecha"
                value={nuevoIngreso.fecha}
                onChange={handleIngresoChange}
                required
              />

              <label>Caballo:</label>
              <input
                type="text"
                name="caballo"
                value={nuevoIngreso.caballo}
                onChange={handleIngresoChange}
                required
              />

              <label>Monto ganado:</label>
              <input
                type="number"
                name="monto"
                value={nuevoIngreso.monto}
                onChange={handleIngresoChange}
                required
              />

              <button type="submit" className="btn-save">
                Guardar
              </button>
              <button
                type="button"
                className="btn-cerrar"
                onClick={() => setShowIngresoModal(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inversiones;
