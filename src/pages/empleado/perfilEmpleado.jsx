import React, { useState, useEffect } from "react";
import "./perfilEmpleado.css";

const PerfilEmpleado = () => {
  const [nombre, setNombre] = useState("Juan");
  const [apellido, setApellido] = useState("Pérez");
  const [email, setEmail] = useState("juan.perez@ejemplo.com");
  // Estado para el número de celular (sin el prefijo)
  const [celular, setCelular] = useState("");
  // Estado para el prefijo telefónico (se actualiza según el país)
  const [prefijo, setPrefijo] = useState("");
  // Estado para la imagen de perfil
  const [foto, setFoto] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  
  // Estados para la lista de países y el país seleccionado
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // Uso de useEffect para obtener la lista de países automáticamente
  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,callingCodes")
      .then((res) => res.json())
      .then((data) => {
        const formattedCountries = data.map((country) => ({
          name: country.name,
          prefix:
            country.callingCodes &&
            country.callingCodes.length > 0 &&
            country.callingCodes[0]
              ? `+${country.callingCodes[0]}`
              : ""
        }));
        setCountries(formattedCountries);
        if (formattedCountries.length > 0) {
          setSelectedCountry(formattedCountries[0].name);
          setPrefijo(formattedCountries[0].prefix);
        }
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // Al cambiar el país, se actualiza el prefijo telefónico
  const handleCountryChange = (e) => {
    const selected = e.target.value;
    setSelectedCountry(selected);
    const found = countries.find((c) => c.name === selected);
    if (found) {
      setPrefijo(found.prefix);
    }
  };

  // Función para manejar la carga de imagen
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="perfil-bg">
      <div className="perfil-container">
        {/* Encabezado con Foto */}
        <div className="perfil-header">
          <img src={foto} alt="Perfil" className="perfil-avatar" />
          <h2 className="perfil-nombre">{nombre} {apellido}</h2>
        </div>

        {/* Formulario de Datos (en 2 columnas) */}
        <form className="perfil-form">
          <div className="input-group">
            <label>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Apellido:</label>
            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input type="email" value={email} readOnly />
          </div>

          {/* Desplegable de países */}
          <div className="input-group">
            <label>País:</label>
            <select value={selectedCountry} onChange={handleCountryChange}>
              {countries.map((c, index) => (
                <option key={index} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Campo para Prefijo (lectura) */}
          <div className="input-group">
            <label>Prefijo:</label>
            <input type="text" value={prefijo} readOnly />
          </div>

          {/* Campo para Celular */}
          <div className="input-group">
            <label>Celular:</label>
            <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} />
          </div>

          {/* Subir Foto (ocupa todo el ancho) */}
          <div className="perfil-upload">
            <label>Cambiar Foto:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          <button className="btn-save">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default PerfilEmpleado;
