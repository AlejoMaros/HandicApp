import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaEdit,
  FaFileInvoiceDollar,
  FaSearch,
  FaMoneyBillAlt,
} from "react-icons/fa";
import "./inversionesEmpleado.css";

const InversionesEmpleado = () => {
  const [gastos, setGastos] = useState([]);
  const [filtro, setFiltro] = useState("");

  // "nuevoGasto" se usa tanto para crear como para editar
  const [nuevoGasto, setNuevoGasto] = useState({
    fecha: "",
    categoria: "",
    caballo: "",
    monto: "",
    descripcion: "",
    metodoPago: "",
    proveedor: "",
    tipoInversion: "",
    cantidad: "",
    comprobante: null,
  });

  // Si "editingId" está en null => estamos en modo crear
  // Si tiene un valor => estamos en modo editar (almacenamos el ID del gasto a editar)
  const [editingId, setEditingId] = useState(null);

  // Al montar, leemos del localStorage si existe
  useEffect(() => {
    const data = localStorage.getItem("gastosEmpleado");
    if (data) {
      setGastos(JSON.parse(data));
    }
  }, []);

  // Guardar en localStorage cada vez que cambie 'gastos'
  useEffect(() => {
    localStorage.setItem("gastosEmpleado", JSON.stringify(gastos));
  }, [gastos]);

  // Manejo de inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoGasto({ ...nuevoGasto, [name]: value });
  };

  // Manejo de archivo
  const handleFileChange = (e) => {
    setNuevoGasto({ ...nuevoGasto, comprobante: e.target.files[0] });
  };

  // Al enviar el form, verificamos si estamos creando o editando
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId === null) {
      // Modo CREAR
      const gastoConId = {
        ...nuevoGasto,
        id: Date.now(), // ID único
        monto: Number(nuevoGasto.monto),
      };
      setGastos([...gastos, gastoConId]);
    } else {
      // Modo EDITAR
      const gastosActualizados = gastos.map((g) =>
        g.id === editingId
          ? { ...g, ...nuevoGasto, monto: Number(nuevoGasto.monto) }
          : g
      );
      setGastos(gastosActualizados);
    }

    // Limpiar form
    setNuevoGasto({
      fecha: "",
      categoria: "",
      caballo: "",
      monto: "",
      descripcion: "",
      metodoPago: "",
      proveedor: "",
      tipoInversion: "",
      cantidad: "",
      comprobante: null,
    });
    setEditingId(null); // Volvemos a modo "crear"
  };

  // Eliminar gasto
  const handleDelete = (id) => {
    const nuevos = gastos.filter((g) => g.id !== id);
    setGastos(nuevos);
  };

  // Editar gasto (llenamos el form con datos existentes)
  const handleEdit = (gasto) => {
    setNuevoGasto({
      fecha: gasto.fecha,
      categoria: gasto.categoria,
      caballo: gasto.caballo,
      monto: gasto.monto,
      descripcion: gasto.descripcion,
      metodoPago: gasto.metodoPago,
      proveedor: gasto.proveedor,
      tipoInversion: gasto.tipoInversion,
      cantidad: gasto.cantidad,
      comprobante: gasto.comprobante,
    });
    setEditingId(gasto.id);
  };

  // Calcular total
  const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);

  // Filtrado (por categoría, caballo o descripción)
  const gastosFiltrados = gastos.filter((gasto) => {
    const textoFiltro = filtro.toLowerCase();
    return (
      gasto.categoria.toLowerCase().includes(textoFiltro) ||
      (gasto.caballo && gasto.caballo.toLowerCase().includes(textoFiltro)) ||
      (gasto.descripcion &&
        gasto.descripcion.toLowerCase().includes(textoFiltro))
    );
  });

  return (
    <div className="inversiones-bg">
      <div className="inversiones-container">
        <h2 className="titulo">
          <FaFileInvoiceDollar /> Inversiones
        </h2>
        <p className="subtitulo">
          Registra y gestiona los gastos e inversiones relacionadas con tus
          caballos.
        </p>

        {/* Formulario (Crear / Editar) */}
        <div className="tarjeta-formulario">
          <h3 className="tarjeta-titulo">
            <FaMoneyBillAlt /> {editingId ? "Editar Gasto" : "Registrar Gasto"}
          </h3>
          <form className="gasto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Fecha:</label>
              <input
                type="date"
                name="fecha"
                value={nuevoGasto.fecha}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Categoría:</label>
              <select
                name="categoria"
                value={nuevoGasto.categoria}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="alimentacion">Alimentación</option>
                <option value="veterinario">Veterinario</option>
                <option value="transporte">Transporte</option>
                <option value="equipamiento">Equipamiento</option>
              </select>
            </div>
            <div className="form-group">
              <label>Caballo Asociado:</label>
              <input
                type="text"
                name="caballo"
                value={nuevoGasto.caballo}
                onChange={handleInputChange}
                placeholder="Nombre del caballo (opcional)"
              />
            </div>
            <div className="form-group">
              <label>Monto:</label>
              <input
                type="number"
                name="monto"
                value={nuevoGasto.monto}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <textarea
                name="descripcion"
                value={nuevoGasto.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Método de Pago:</label>
              <select
                name="metodoPago"
                value={nuevoGasto.metodoPago}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar</option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>
            <div className="form-group">
              <label>Proveedor:</label>
              <input
                type="text"
                name="proveedor"
                value={nuevoGasto.proveedor}
                onChange={handleInputChange}
                placeholder="Ej: Veterinaria Los Robles"
              />
            </div>
            <div className="form-group">
              <label>Tipo de Inversión:</label>
              <select
                name="tipoInversion"
                value={nuevoGasto.tipoInversion}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar</option>
                <option value="fija">Fija</option>
                <option value="recurrente">Recurrente</option>
                <option value="extraordinaria">Extraordinaria</option>
              </select>
            </div>
            <div className="form-group">
              <label>Cantidad:</label>
              <input
                type="text"
                name="cantidad"
                value={nuevoGasto.cantidad}
                onChange={handleInputChange}
                placeholder="Ej: 20 kg de alimento"
              />
            </div>
            <div className="form-group">
              <label>Comprobante:</label>
              <input type="file" onChange={handleFileChange} />
            </div>

            <button type="submit" className="submit-button">
              {editingId ? "Actualizar Gasto" : "Registrar Gasto"}
            </button>
          </form>
        </div>

        {/* Historial de Gastos */}
        <div className="tarjeta-gastos">
          <h3 className="tarjeta-titulo">Historial de Gastos</h3>

          <div className="barra-busqueda">
            <FaSearch className="icono-busqueda" />
            <input
              type="text"
              className="filtro-input"
              placeholder="Filtrar por categoría, caballo o descripción..."
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          {/* Contenedor con scroll horizontal para la tabla */}
          <div className="gastos-table-wrapper">
            <table className="gastos-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Categoría</th>
                  <th>Caballo</th>
                  <th>Método Pago</th>
                  <th>Proveedor</th>
                  <th>Tipo Inversión</th>
                  <th>Monto</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {gastosFiltrados.map((gasto) => (
                  <tr key={gasto.id}>
                    <td>{gasto.fecha}</td>
                    <td>{gasto.categoria}</td>
                    <td>{gasto.caballo || "General"}</td>
                    <td>{gasto.metodoPago || "—"}</td>
                    <td>{gasto.proveedor || "—"}</td>
                    <td>{gasto.tipoInversion || "—"}</td>
                    <td>${gasto.monto}</td>
                    <td>{gasto.descripcion}</td>
                    <td>
                      <button onClick={() => handleEdit(gasto)}>
                        <FaEdit />
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => handleDelete(gasto.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {gastosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="9">No hay gastos que coincidan con el filtro.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <h3 className="total-gastado">Total Gastado: ${totalGastos}</h3>
        </div>
      </div>
    </div>
  );
};

export default InversionesEmpleado;
