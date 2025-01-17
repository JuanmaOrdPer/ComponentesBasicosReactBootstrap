import React, { useEffect, useState } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Carga los datos del archivo JSON
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("peliculas.json");
      const data = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="container">
      {/* Película seleccionada */}
      {selectedMovie && (
        <SelectedMovie movie={selectedMovie} />
      )}

      <div className="row">
        {/* Tarjetas de películas */}
        {movies.map((movie) => (
          <MovieCard
            key={movie.titulo}
            movie={movie}
            onSelect={() => setSelectedMovie(movie)}
          />
        ))}
      </div>
    </div>
  );
};

const SelectedMovie = ({ movie }) => {
  return (
    <div className="row my-3">
      <div className="col-md-8">
        <img
          src={movie.foto}
          alt={movie.titulo}
          className="img-fluid"
        />
      </div>
      <div className="col-md-4">
        <h3>{movie.titulo}</h3>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Actores:</strong> {movie.actoresPrincipales.join(", ")}</p>
        <p><strong>Sinopsis:</strong> {movie.sinopsis}</p>
      </div>
    </div>
  );
};

const MovieCard = ({ movie, onSelect }) => {
  const [showSynopsis, setShowSynopsis] = useState(false);

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <img
          src={movie.foto}
          alt={movie.titulo}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{movie.titulo}</h5>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Actores:</strong> {movie.actoresPrincipales.join(", ")}</p>
          {showSynopsis && <p><strong>Sinopsis:</strong> {movie.sinopsis}</p>}
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
