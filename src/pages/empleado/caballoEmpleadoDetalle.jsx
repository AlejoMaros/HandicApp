import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CaballoFoto from "../../assets/CaballoFoto.png";
import "./caballoEmpleadoDetalle.css";

const CaballoEmpleadoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [horse, setHorse] = useState(null);

  useEffect(() => {
    const storedHorses = JSON.parse(localStorage.getItem("caballosData")) || [];
    const foundHorse = storedHorses.find((h) => String(h.id) === id);
    setHorse(foundHorse);
  }, [id]);

  if (!horse) {
    return (
      <div className="caballo-detalle-container">
        Caballo no encontrado.
      </div>
    );
  }

  const handleExportFicha = () => {
    // Aquí podrías implementar la exportación (por ejemplo, window.print() o generar un PDF)
    alert("Exportando ficha del caballo...");
  };

  return (
    <div className="caballo-detalle-container">
      {/* Encabezado: Botón Volver, Nombre y Estado */}
      <div className="detalle-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div className="header-info">
          <h2>{horse.nombre || "Sin Nombre"}</h2>
          <span className="etiqueta-estado">{horse.estado || "—"}</span>
        </div>
      </div>

      {/* Sección principal: Imagen y datos básicos */}
      <div className="caballo-main">
        <div className="caballo-imagen">
          <img
            src={horse.fotoBase64 ? horse.fotoBase64 : CaballoFoto}
            alt={horse.nombre || "Caballo"}
          />
        </div>
        <div className="caballo-basicos">
          <div className="info-item">
            <strong>RP:</strong> {horse.rp || "—"}
          </div>
          <div className="info-item">
            <strong>SBA:</strong> {horse.sba || "—"}
          </div>
          <div className="info-item">
            <strong>Fecha Nac.:</strong> {horse.fechaNacimiento || "—"}
          </div>
          <div className="info-item">
            <strong>Nombre:</strong> {horse.nombre || "—"}
          </div>
          <button className="btn-exportar" onClick={handleExportFicha}>
            Exportar Ficha
          </button>
        </div>
      </div>

      {/* Sección de Pedigree (Árbol Genealógico) */}
      <div className="caballo-pedigree">
        <h3>Pedigree</h3>
        <div className="pedigree-container">
          <div className="pedigree-item">
            <span className="pedigree-label">Madre:</span>
            <span>{horse.madre || "—"}</span>
          </div>
          <div className="pedigree-item">
            <span className="pedigree-label">Padre:</span>
            <span>{horse.padre || "—"}</span>
          </div>
          {/* Agrega más niveles si tienes la información */}
        </div>
      </div>

      {/* Sección inferior: Notas y Datos completos */}
      <div className="detalle-bottom">
        <div className="detalle-notas">
          <h3>Notas</h3>
          {horse.notas && horse.notas.trim().length > 0 ? (
            <p>{horse.notas}</p>
          ) : (
            <p>No hay notas registradas.</p>
          )}
        </div>
        <div className="detalle-datos">
          <h3>Datos del Caballo</h3>
          <p>
            <strong>Propietario:</strong> {horse.propietario || "—"}
          </p>
          <p>
            <strong>Establecimiento:</strong> {horse.establecimiento || "—"}
          </p>
          <p>
            <strong>Criador:</strong> {horse.criador || "—"}
          </p>
          <p>
            <strong>Sexo:</strong> {horse.sexo || "—"}
          </p>
          <p>
            <strong>Raza:</strong> {horse.raza || "—"}
          </p>
          <p>
            <strong>Pelaje:</strong> {horse.pelaje || "—"}
          </p>
          <p>
            <strong>País:</strong> {horse.pais || "—"}
          </p>
          <p>
            <strong>ADN:</strong> {horse.adn || "—"}
          </p>
          <p>
            <strong>Chip:</strong> {horse.chip || "—"}
          </p>
          <p>
            <strong>Código:</strong> {horse.codigo || "—"}
          </p>
          <p>
            <strong>Etiqueta:</strong> {horse.etiqueta || "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaballoEmpleadoDetalle;
