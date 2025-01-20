import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchPeliculas = async () => {
      const response = await fetch("/peliculas.json");
      const data = await response.json();
      setPeliculas(data);
    };
    fetchPeliculas();
  }, []);

  return (
    <div className="container my-4">
      {peliculaSeleccionada && (
        <PeliculaSeleccionada
          pelicula={peliculaSeleccionada}
          onClose={() => setPeliculaSeleccionada(null)}
        />
      )}

      <div className="row mt-4">
        {peliculas.map((pelicula) => (
          <PeliculaCard
            key={pelicula.titulo}
            pelicula={pelicula}
            onSelect={() => setPeliculaSeleccionada(pelicula)}
          />
        ))}
      </div>
    </div>
  );
};

const PeliculaSeleccionada = ({ pelicula, onClose }) => (
  <div className="row mb-4">
    <div className="col-md-8">
      <img
        src={pelicula.foto}
        alt={pelicula.titulo}
        className="img-fluid rounded"
        style={{
          maxHeight: "100%",
          maxWidth: "100%", 
        }}
      />
    </div>
    <div className="col-md-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3>{pelicula.titulo}</h3>
        <button className="btn btn-danger btn-sm" onClick={onClose}>
          Cerrar
        </button>
      </div>
      <p>
        <strong>Director:</strong> {pelicula.director}
      </p>
      <p>
        <strong>Actores:</strong> {pelicula.actoresPrincipales.join(", ")}
      </p>
      <p>
        <strong>Sinopsis:</strong> {pelicula.sinopsis}
      </p>
    </div>
  </div>
);

const PeliculaCard = ({ pelicula, onSelect }) => {
  const [showSynopsis, setShowSynopsis] = useState(false);

  return (
    <div className="col-md-3 my-3">
      <div className="card h-100">
        <img
          src={pelicula.foto}
          alt={pelicula.titulo}
          className="card-img-top img-fluid rounded"
          style={{
            maxHeight: "200px",
            objectFit: "cover",
            width: "100%",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{pelicula.titulo}</h5>
          <p>
            <strong>Director:</strong> {pelicula.director}
          </p>
          <p>
            <strong>Actores:</strong> {pelicula.actoresPrincipales.join(", ")}
          </p>
          {showSynopsis && (
            <p>
              <strong>Sinopsis:</strong> {pelicula.sinopsis}
            </p>
          )}
          <button
            className="btn btn-info btn-sm"
            onClick={() => setShowSynopsis(!showSynopsis)}
          >
            {showSynopsis ? "Ocultar" : "Más"}
          </button>
          <button
            className="btn btn-primary btn-sm ms-2"
            onClick={onSelect}
          >
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
