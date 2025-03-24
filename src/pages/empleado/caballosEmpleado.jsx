import { useState } from "react";
import { Link } from "react-router-dom";
import { List, Grid3x3, PlusCircle, Trash2, Edit, FileText, X } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./caballosEmpleado.css";

// Importa las imágenes de ejemplo y la imagen por defecto para caballo
import caballo1 from "../../assets/caballo1.jpg";
import caballo2 from "../../assets/caballo2.jpg";
import caballo3 from "../../assets/caballo3.jpg";
import defaultHorseImage from "../../assets/caballofoto.png";

export default function CaballosEmpleado() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [horses, setHorses] = useState([
    {
      id: 1,
      name: "Relámpago",
      establecimiento: "Establo A",
      propietario: "Juan Pérez",
      sexo: "Macho",
      edad: 5,
      pelaje: "Negro",
      sangre: "Sangre 1",
      fechaNacimiento: "2018-05-10",
      madre: "Madre 1",
      padre: "Padre 1",
      image: caballo1
    },
    {
      id: 2,
      name: "Tormenta",
      establecimiento: "Establo B",
      propietario: "Carlos López",
      sexo: "Hembra",
      edad: 7,
      pelaje: "Blanco",
      sangre: "Sangre 2",
      fechaNacimiento: "2016-03-22",
      madre: "Madre 2",
      padre: "Padre 2",
      image: caballo2
    },
    {
      id: 3,
      name: "Rayo",
      establecimiento: "Establo C",
      propietario: "Ana García",
      sexo: "Macho",
      edad: 4,
      pelaje: "Marrón",
      sangre: "Sangre 3",
      fechaNacimiento: "2019-11-30",
      madre: "Madre 3",
      padre: "Padre 3",
      image: caballo3
    },
  ]);

  // Filtrar caballos según lo ingresado en el buscador (por nombre o propietario)
  const filteredHorses = horses.filter((horse) =>
    horse.name.toLowerCase().includes(search.toLowerCase()) ||
    horse.propietario.toLowerCase().includes(search.toLowerCase())
  );

  // Estado para el modal y formulario de nuevo caballo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHorse, setNewHorse] = useState({
    name: "",
    establecimiento: "",
    propietario: "",
    sexo: "",
    edad: "",
    pelaje: "",
    sangre: "",
    fechaNacimiento: "",
    madre: "",
    padre: "",
    image: ""
  });

  // Para mostrar vista previa de la imagen
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewHorse((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Lista de Caballos", 10, 10);
    const tableData = horses.map((horse) => [
      horse.name,
      horse.propietario,
      horse.edad,
      horse.pelaje,
    ]);
    doc.autoTable({
      head: [["Nombre", "Propietario", "Edad", "Pelaje"]],
      body: tableData,
    });
    doc.save("caballos.pdf");
  };

  const handleDelete = (id) => {
    if(window.confirm("¿Estás seguro de que quieres eliminar este caballo?")) {
      setHorses(horses.filter((horse) => horse.id !== id));
    }
  };

  const handleNewHorseChange = (e) => {
    const { name, value } = e.target;
    setNewHorse((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddHorse = (e) => {
    e.preventDefault();
    const newId = horses.length ? horses[horses.length - 1].id + 1 : 1;
    setHorses([...horses, { ...newHorse, id: newId }]);
    // Reinicia formulario
    setNewHorse({
      name: "",
      establecimiento: "",
      propietario: "",
      sexo: "",
      edad: "",
      pelaje: "",
      sangre: "",
      fechaNacimiento: "",
      madre: "",
      padre: "",
      image: ""
    });
    setIsModalOpen(false);
  };

  return (
    <div className="horse-manager-container">
      <div className="horse-manager-header">
        <button className="btn-add-horse" onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="icon" /> Agregar Caballo
        </button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar ejemplar..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="view-buttons">
          <button onClick={() => setView("list")} className="btn-list">
            <List className="icon-small" /> Lista
          </button>
          <button onClick={() => setView("grid")} className="btn-grid">
            <Grid3x3 className="icon-small" /> Grilla
          </button>
          <button onClick={exportToPDF} className="btn-export">
            <FileText className="icon-small" /> PDF
          </button>
        </div>
      </div>

      {view === "list" && (
        <table className="horse-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Propietario</th>
              <th>Edad</th>
              <th>Pelaje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredHorses.map((horse) => (
              <tr key={horse.id}>
                <td>
                  <img
                    src={horse.image ? horse.image : defaultHorseImage}
                    alt={horse.name}
                    className="horse-table-image"
                  />
                </td>
                <td className="horse-name">{horse.name}</td>
                <td>{horse.propietario}</td>
                <td>{horse.edad}</td>
                <td>{horse.pelaje}</td>
                <td>
                  <button onClick={() => handleDelete(horse.id)} className="btn-delete">
                    <Trash2 className="icon-small" />
                  </button>
                  <button className="btn-edit">
                    <Edit className="icon-small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {view === "grid" && (
        <div className="horse-grid">
          {filteredHorses.map((horse) => (
            <Link key={horse.id} to={`/caballoEmpleadoDetalle/${horse.id}`} className="horse-card" style={{ textDecoration: "none" }}>
              <img
                src={horse.image ? horse.image : defaultHorseImage}
                alt={horse.name}
                className="horse-card-image"
              />
              <div className="horse-card-content">
                <h3>{horse.name}</h3>
                <div className="horse-card-info">
                  <div className="left-col">
                    <p><strong>Establecimiento:</strong> {horse.establecimiento}</p>
                    <p><strong>Propietario:</strong> {horse.propietario}</p>
                  </div>
                  <div className="right-col">
                    <p><strong>Sexo:</strong> {horse.sexo}</p>
                    <p><strong>Edad:</strong> {horse.edad}</p>
                    <p><strong>Pelaje:</strong> {horse.pelaje}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Modal para agregar nuevo caballo */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <span>Agregar Nuevo Ejemplar</span>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X className="icon-small" />
              </button>
            </div>
            <form onSubmit={handleAddHorse} className="modal-body">
              <input type="text" name="name" placeholder="NOMBRE" value={newHorse.name} onChange={handleNewHorseChange} required />
              <input type="text" name="establecimiento" placeholder="ESTABLECIMIENTO" value={newHorse.establecimiento} onChange={handleNewHorseChange} required />
              <input type="text" name="propietario" placeholder="PROPIETARIO" value={newHorse.propietario} onChange={handleNewHorseChange} required />
              <input type="text" name="sexo" placeholder="SEXO" value={newHorse.sexo} onChange={handleNewHorseChange} required />
              <input type="number" name="edad" placeholder="EDAD" value={newHorse.edad} onChange={handleNewHorseChange} required />
              <input type="text" name="pelaje" placeholder="PELAJE" value={newHorse.pelaje} onChange={handleNewHorseChange} required />
              <input type="text" name="sangre" placeholder="SANGRE" value={newHorse.sangre} onChange={handleNewHorseChange} required />
              <input type="date" name="fechaNacimiento" placeholder="FECHA NACIMIENTO" value={newHorse.fechaNacimiento} onChange={handleNewHorseChange} required />
              <input type="text" name="madre" placeholder="MADRE" value={newHorse.madre} onChange={handleNewHorseChange} required />
              <input type="text" name="padre" placeholder="PADRE" value={newHorse.padre} onChange={handleNewHorseChange} required />
              {/* Campo para cargar imagen con vista previa */}
              <div className="image-upload">
                <label className="upload-label">Cargar Imagen</label>
                <input type="file" accept="image/*" onChange={handleImageFileChange} />
                {newHorse.image && (
                  <img src={newHorse.image} alt="Vista previa" className="image-preview" />
                )}
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">
                  Cancelar
                </button>
                <button type="submit" className="btn-submit">
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
