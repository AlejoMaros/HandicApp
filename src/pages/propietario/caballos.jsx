import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaClipboardList, FaSearch } from "react-icons/fa";
import "./caballos.css";

const Caballos = () => {
  // Lista de caballos
  const [caballos, setCaballos] = useState([]);

  // Para filtrar
  const [filtro, setFiltro] = useState("");

  // Modal caballo (agregar/editar)
  const [showHorseModal, setShowHorseModal] = useState(false);
  const [editingHorseId, setEditingHorseId] = useState(null);

  // Modal logs
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState(null);

  // Form Caballo
  const [formHorse, setFormHorse] = useState({
    id: null,
    nombre: "",
    edad: "",
    raza: "",
    estatus: "Entrenamiento", // Valor por defecto
    fotoBase64: "", // Para la foto
    logs: [],
  });

  // Form Log
  const [editingLogId, setEditingLogId] = useState(null); // si no es null => editando un log
  const [logDate, setLogDate] = useState("");
  const [logActividad, setLogActividad] = useState("");
  const [logObservaciones, setLogObservaciones] = useState("");

  // Cargar del localStorage al iniciar
  useEffect(() => {
    const data = localStorage.getItem("caballosData");
    if (data) {
      setCaballos(JSON.parse(data));
    }
  }, []);

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("caballosData", JSON.stringify(caballos));
  }, [caballos]);

  /* ======================
     FILTRAR caballos
  ======================= */
  const caballosFiltrados = caballos.filter((horse) => {
    const texto = filtro.toLowerCase();
    return (
      horse.nombre.toLowerCase().includes(texto) ||
      (horse.raza && horse.raza.toLowerCase().includes(texto))
    );
  });

  /* ======================
     MANEJO DE CABALLOS
  ======================= */
  // Abrir modal para agregar nuevo
  const handleOpenAdd = () => {
    setFormHorse({
      id: null,
      nombre: "",
      edad: "",
      raza: "",
      estatus: "Entrenamiento",
      fotoBase64: "",
      logs: [],
    });
    setEditingHorseId(null);
    setShowHorseModal(true);
  };

  // Abrir modal para editar
  const handleEditHorse = (horse) => {
    setFormHorse(horse);
    setEditingHorseId(horse.id);
    setShowHorseModal(true);
  };

  // Guardar caballo
  const handleSaveHorse = (e) => {
    e.preventDefault();
    if (editingHorseId === null) {
      // Agregar
      const newHorse = { ...formHorse, id: Date.now() };
      setCaballos([...caballos, newHorse]);
    } else {
      // Editar
      const updated = caballos.map((c) =>
        c.id === editingHorseId ? formHorse : c
      );
      setCaballos(updated);
    }
    setShowHorseModal(false);
    setEditingHorseId(null);
  };

  // Eliminar caballo
  const handleDeleteHorse = (id) => {
    const updated = caballos.filter((c) => c.id !== id);
    setCaballos(updated);
  };

  // Cambios en form Caballo
  const handleHorseChange = (e) => {
    const { name, value } = e.target;
    setFormHorse({ ...formHorse, [name]: value });
  };

  // Manejar subida de foto
  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Convertir a base64 en un demo real (no recomend. en prod. con archivos grandes)
    const reader = new FileReader();
    reader.onload = () => {
      setFormHorse({ ...formHorse, fotoBase64: reader.result });
    };
    reader.readAsDataURL(file);
  };

  /* ======================
     MANEJO DE LOGS
  ======================= */
  // Abrir modal de logs
  const handleOpenLogModal = (horse) => {
    setSelectedHorse(horse);
    // Reset form de log
    setEditingLogId(null);
    setLogDate("");
    setLogActividad("");
    setLogObservaciones("");
    setShowLogModal(true);
  };

  // Guardar log (nuevo o editado)
  const handleSaveLog = (e) => {
    e.preventDefault();
    if (editingLogId === null) {
      const newLog = {
        id: Date.now(),
        fecha: logDate,
        actividad: logActividad,
        observaciones: logObservaciones,
      };
      const updated = caballos.map((c) => {
        if (c.id === selectedHorse.id) {
          return { ...c, logs: [...c.logs, newLog] };
        }
        return c;
      });
      setCaballos(updated);
    } else {
      const updated = caballos.map((c) => {
        if (c.id === selectedHorse.id) {
          const updatedLogs = c.logs.map((lg) =>
            lg.id === editingLogId
              ? {
                  ...lg,
                  fecha: logDate,
                  actividad: logActividad,
                  observaciones: logObservaciones,
                }
              : lg
          );
          return { ...c, logs: updatedLogs };
        }
        return c;
      });
      setCaballos(updated);
    }
    setShowLogModal(false);
  };

  // Manejar edición de log
  const handleEditLog = (logItem) => {
    setEditingLogId(logItem.id);
    setLogDate(logItem.fecha);
    setLogActividad(logItem.actividad);
    setLogObservaciones(logItem.observaciones);
  };

  // Eliminar log
  const handleDeleteLog = (logId) => {
    const updated = caballos.map((c) => {
      if (c.id === selectedHorse.id) {
        const newLogs = c.logs.filter((lg) => lg.id !== logId);
        return { ...c, logs: newLogs };
      }
      return c;
    });
    setCaballos(updated);
  };

  return (
    <div className="caballos-empleado-bg">
      <div className="caballos-empleado-container">
        <h2 className="titulo">Gestión de Caballos</h2>
        <p className="subtitulo">
          Filtra, agrega y edita información de los caballos. Lleva registro de sus actividades diarias.
        </p>

        {/* Barra de filtro */}
        <div className="filtro-area">
          <FaSearch className="icono-search" />
          <input
            type="text"
            placeholder="Buscar por nombre o raza..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        {/* Botón Agregar */}
        <button className="btn-agregar" onClick={handleOpenAdd}>
          <FaPlus /> Agregar Caballo
        </button>

        {/* Tabla de caballos dentro de un wrapper para scroll en móvil */}
        <div className="tabla-wrapper">
          <table className="tabla-caballos">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Raza</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {caballosFiltrados.map((horse) => (
                <tr key={horse.id}>
                  <td>
                    {horse.fotoBase64 ? (
                      <img
                        src={horse.fotoBase64}
                        alt={horse.nombre}
                        className="img-horse"
                      />
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "#aaa" }}>
                        Sin Foto
                      </span>
                    )}
                  </td>
                  <td>{horse.nombre}</td>
                  <td>{horse.edad}</td>
                  <td>{horse.raza}</td>
                  <td>{horse.estatus}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditHorse(horse)}>
                      <FaEdit /> Editar
                    </button>
                    <button className="btn-log" onClick={() => handleOpenLogModal(horse)}>
                      <FaClipboardList /> Logs
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteHorse(horse.id)}>
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {caballosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6">No se encontraron caballos.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Caballo */}
      {showHorseModal && (
        <div className="modal-overlay" onClick={() => setShowHorseModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingHorseId === null ? "Agregar Caballo" : "Editar Caballo"}</h3>
            <form className="form-caballo" onSubmit={handleSaveHorse}>
              <label>
                Nombre:
                <input
                  type="text"
                  name="nombre"
                  value={formHorse.nombre}
                  onChange={handleHorseChange}
                  required
                />
              </label>
              <label>
                Edad:
                <input
                  type="number"
                  name="edad"
                  value={formHorse.edad}
                  onChange={handleHorseChange}
                />
              </label>
              <label>
                Raza:
                <input
                  type="text"
                  name="raza"
                  value={formHorse.raza}
                  onChange={handleHorseChange}
                />
              </label>
              <label>
                Estatus:
                <select
                  name="estatus"
                  value={formHorse.estatus}
                  onChange={handleHorseChange}
                >
                  <option value="Entrenamiento">Entrenamiento</option>
                  <option value="Descanso">Descanso</option>
                  <option value="Lesionado">Lesionado</option>
                </select>
              </label>
              <label>
                Foto:
                <input type="file" accept="image/*" onChange={handleFotoChange} />
              </label>
              {formHorse.fotoBase64 && (
                <img
                  src={formHorse.fotoBase64}
                  alt="preview"
                  style={{ width: "100px", marginTop: "0.5rem" }}
                />
              )}
              <button type="submit" className="btn-save">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Logs */}
      {showLogModal && selectedHorse && (
        <div className="modal-overlay" onClick={() => setShowLogModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Registros de {selectedHorse.nombre}</h3>
            <form className="form-log" onSubmit={handleSaveLog}>
              <label>
                Fecha:
                <input
                  type="date"
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                  required
                />
              </label>
              <label>
                Actividad:
                <input
                  type="text"
                  value={logActividad}
                  onChange={(e) => setLogActividad(e.target.value)}
                  required
                />
              </label>
              <label>
                Observaciones:
                <textarea
                  rows="3"
                  value={logObservaciones}
                  onChange={(e) => setLogObservaciones(e.target.value)}
                />
              </label>
              <button type="submit" className="btn-save">
                {editingLogId === null ? "Agregar Log" : "Guardar Cambios"}
              </button>
            </form>

            {/* Listado de logs */}
            {selectedHorse.logs && selectedHorse.logs.length > 0 ? (
              <ul className="lista-logs">
                {selectedHorse.logs.map((lg) => (
                  <li key={lg.id}>
                    <strong>{lg.fecha}:</strong> {lg.actividad}
                    {lg.observaciones && ` | Obs: ${lg.observaciones}`}
                    <div className="log-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setEditingLogId(lg.id);
                          setLogDate(lg.fecha);
                          setLogActividad(lg.actividad);
                          setLogObservaciones(lg.observaciones || "");
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteLog(lg.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay registros para este caballo.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Caballos;
