import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  PlusCircle,
  Trash2,
  Edit,
  ArrowUpDown,
  Filter
} from "lucide-react";
import "./consumosEmpleado.css";

// Opciones de caballos (puedes cargarlos dinámicamente)
const horseOptions = [
  { value: "Caballo 1", label: "Caballo 1" },
  { value: "Caballo 2", label: "Caballo 2" },
  { value: "Caballo 3", label: "Caballo 3" },
  { value: "Caballo 4", label: "Caballo 4" },
];

const RegistroEventos = () => {
  // Datos principales
  const [gastos, setGastos] = useState([]);
  const [search, setSearch] = useState("");

  // Modal
  const [showModal, setShowModal] = useState(false);

  // Campos del formulario
  const [category, setCategory] = useState("");
  const [tarea, setTarea] = useState("");
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [exactHour, setExactHour] = useState("");
  const [exactMinute, setExactMinute] = useState("");
  const [responsable, setResponsable] = useState("");
  const [selectedHorses, setSelectedHorses] = useState([]);
  const [honorarios, setHonorarios] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [observaciones, setObservaciones] = useState("");
  const [estado, setEstado] = useState("");
  const [calendarScheduled, setCalendarScheduled] = useState(false); // Nuevo checkbox

  // Opciones de tareas
  const tareasGenerales = [
    "Entrenamiento diario",
    "Equitación",
    "Alimentación",
    "Revisión Veterinaria",
    "Descanso / Reposo",
    "Higiene (cepillado/limpieza)",
    "Herraje / Cuidado de Cascos",
    "Medicamento / Suplementos",
    "Baño",
    "Traslado (movilidad o viaje)"
  ];
  const tareasEspecializadas = [
    "Salto",
    "Doma clásica",
    "Carrera (Velocidad)",
    "Resistencia",
    "Trabajo en cuerda",
    "Paseo suave",
    "Trabajo con obstáculos",
    "Rehabilitación Física",
    "Trote / Galope dirigido",
    "Entrenamiento específico personalizado"
  ];

  // Responsables (ejemplo)
  const responsables = ["Juan Pérez", "María González", "Carlos López"];

  useEffect(() => {
    const data = localStorage.getItem("gastosEmpleado");
    if (data) {
      setGastos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gastosEmpleado", JSON.stringify(gastos));
  }, [gastos]);

  // Filtrado
  const filteredGastos = gastos.filter(
    (evento) =>
      evento.tarea.toLowerCase().includes(search.toLowerCase()) ||
      (evento.observaciones &&
        evento.observaciones.toLowerCase().includes(search.toLowerCase()))
  );

  // Eliminar un registro
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este evento?")) {
      setGastos(gastos.filter((evento) => evento.id !== id));
    }
  };

  // Métodos sort y filter (demo)
  const handleSort = () => {
    alert("Ordenar eventos...");
  };
  const handleFilter = () => {
    alert("Filtrar eventos...");
  };

  // Abrir/Cerrar modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Manejo de archivos
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };
  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  // Al cambiar la categoría, resetea la tarea
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setTarea("");
  };

  // Al seleccionar caballos con react-select
  const handleHorsesChange = (selectedOptions) => {
    setSelectedHorses(selectedOptions || []);
  };

  // Validar y guardar
  const handleAddEvent = (e) => {
    e.preventDefault();
    // Validaciones mínimas
    if (!category || !tarea || !fecha || !turno || !responsable || selectedHorses.length === 0) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }
    if (turno === "Hora Exacta" && (exactHour === "" || exactMinute === "")) {
      alert("Por favor, ingrese la hora exacta y los minutos.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      category,
      tarea,
      fecha,
      turno,
      exactHour: turno === "Hora Exacta" ? exactHour : "",
      exactMinute: turno === "Hora Exacta" ? exactMinute : "",
      responsable,
      // Convertimos array de {value,label} a un array de strings
      horses: selectedHorses.map((opt) => opt.value),
      honorarios,
      attachments: attachments.map((file) => file.name),
      observaciones,
      estado,
      calendarScheduled // Guarda true/false si el usuario marcó "Agendar en Calendario"
    };

    setGastos([...gastos, newEvent]);
    // Limpiar formulario
    setCategory("");
    setTarea("");
    setFecha("");
    setTurno("");
    setExactHour("");
    setExactMinute("");
    setResponsable("");
    setSelectedHorses([]);
    setHonorarios("");
    setAttachments([]);
    setObservaciones("");
    setEstado("");
    setCalendarScheduled(false);
    closeModal();
  };

  return (
    <div className="inicio-empleado">
      <header className="header">
        <h1 className="titulo">Panel de Consumos</h1>
      </header>
      <main className="contenido">
        <div className="tarjeta top-card">
          <div className="actions-row">
            <button className="btn-add-horse" onClick={openModal}>
              <PlusCircle className="icon" /> Registrar Evento
            </button>
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar evento..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <button className="btn-sort" onClick={handleSort}>
                <ArrowUpDown className="icon-small" /> Ordenar
              </button>
              <button className="btn-filter" onClick={handleFilter}>
                <Filter className="icon-small" /> Filtrar
              </button>
            </div>
          </div>
          <table className="horse-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tarea</th>
                <th>Honorarios</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredGastos.length > 0 ? (
                filteredGastos.map((evento) => (
                  <tr key={evento.id}>
                    <td data-label="Fecha">{evento.fecha}</td>
                    <td data-label="Tarea">{evento.tarea}</td>
                    <td data-label="Honorarios">${evento.honorarios}</td>
                    <td data-label="Observaciones">{evento.observaciones}</td>
                    <td data-label="Acciones">
                      <button className="btn-edit">
                        <Edit className="icon-small" />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(evento.id)}
                      >
                        <Trash2 className="icon-small" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    No hay eventos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Título del modal */}
            <h2>Registrar Evento</h2>

            {/* Formulario */}
            <form onSubmit={handleAddEvent} className="modal-form-grid">
              {/* Categoría de Tarea */}
              <div className="form-group">
                <label>Categoría de Tarea <span className="required">*</span></label>
                <select value={category} onChange={handleCategoryChange} required>
                  <option value="">Seleccione...</option>
                  <option value="Tareas Generales">Tareas Generales</option>
                  <option value="Entrenamiento Especializado">Entrenamiento Especializado</option>
                </select>
              </div>

              {/* Tarea */}
              <div className="form-group">
                <label>Tarea <span className="required">*</span></label>
                <select value={tarea} onChange={(e) => setTarea(e.target.value)} required>
                  <option value="">Seleccione...</option>
                  {category === "Tareas Generales" &&
                    tareasGenerales.map((t, i) => (
                      <option key={i} value={t}>{t}</option>
                    ))}
                  {category === "Entrenamiento Especializado" &&
                    tareasEspecializadas.map((t, i) => (
                      <option key={i} value={t}>{t}</option>
                    ))}
                </select>
              </div>

              {/* Fecha */}
              <div className="form-group">
                <label>Fecha de Realización <span className="required">*</span></label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>

              {/* Turno */}
              <div className="form-group">
                <label>Hora o Turno <span className="required">*</span></label>
                <select value={turno} onChange={(e) => setTurno(e.target.value)} required>
                  <option value="">Seleccione...</option>
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                  <option value="Hora Exacta">Hora Exacta</option>
                </select>
              </div>

              {/* Hora Exacta */}
              {turno === "Hora Exacta" && (
                <div className="form-group full exact-time">
                  <label>Hora Exacta <span className="required">*</span></label>
                  <div className="exact-time-row">
                    <input
                      type="number"
                      min="0"
                      max="23"
                      placeholder="HH"
                      value={exactHour}
                      onChange={(e) => setExactHour(e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      min="0"
                      max="59"
                      placeholder="MM"
                      value={exactMinute}
                      onChange={(e) => setExactMinute(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Responsable */}
              <div className="form-group">
                <label>Responsable <span className="required">*</span></label>
                <select value={responsable} onChange={(e) => setResponsable(e.target.value)} required>
                  <option value="">Seleccione...</option>
                  {responsables.map((r, i) => (
                    <option key={i} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Selección de Caballos con react-select */}
              <div className="form-group full">
                <label>Caballos <span className="required">*</span></label>
                <Select
                  className="select-horses"
                  isMulti
                  options={horseOptions}
                  value={selectedHorses}
                  onChange={handleHorsesChange}
                  placeholder="Seleccione caballos..."
                  noOptionsMessage={() => "No hay caballos"}
                />
              </div>

              {/* Honorarios */}
              <div className="form-group">
                <label>Honorarios Asociados</label>
                <input
                  type="number"
                  placeholder="Ej: 100"
                  value={honorarios}
                  onChange={(e) => setHonorarios(e.target.value)}
                />
              </div>

              {/* Adjuntar Documentos */}
              <div className="form-group">
                <label>Adjuntar Documentos</label>
                <input type="file" multiple onChange={handleAttachmentChange} />
                {attachments.length > 0 && (
                  <ul className="attachment-list">
                    {attachments.map((file, i) => (
                      <li key={i}>
                        {file.name}
                        <button type="button" onClick={() => removeAttachment(i)}>
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Observaciones */}
              <div className="form-group full">
                <label>Observaciones / Notas Adicionales</label>
                <textarea
                  placeholder="Ingrese observaciones..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
              </div>

              {/* Estado de la Tarea */}
              <div className="form-group">
                <label>Estado de la Tarea</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value="">Seleccione...</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En curso">En curso</option>
                  <option value="Completada">Completada</option>
                </select>
              </div>

              {/* Nuevo checkbox: Agendar en Calendario */}
              <div className="form-group">
                <label>Agendar en Calendario</label>
                <input
                  type="checkbox"
                  checked={calendarScheduled}
                  onChange={(e) => setCalendarScheduled(e.target.checked)}
                />
              </div>

              {/* Botones Guardar/Cancelar */}
              <div className="modal-actions full">
                <button type="submit" className="btn-save-modal">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn-cancel-modal"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroEventos;
