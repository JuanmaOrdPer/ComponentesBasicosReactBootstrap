import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

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
    <Container className="my-4">
      {peliculaSeleccionada && (
        <PeliculaSeleccionada
          pelicula={peliculaSeleccionada}
          onClose={() => setPeliculaSeleccionada(null)}
        />
      )}

      <Row className="mt-4">
        {peliculas.map((pelicula) => (
          <Col xs={12} sm={6} md={4} lg={3} key={pelicula.titulo} className="my-3">
            <PeliculaCard
              pelicula={pelicula}
              onSelect={() => setPeliculaSeleccionada(pelicula)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const PeliculaSeleccionada = ({ pelicula, onClose }) => (
  <Row className="mb-4">
    <Col md={8}>
      <img
        src={pelicula.foto}
        alt={pelicula.titulo}
        className="img-fluid rounded"
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      />
    </Col>
    <Col md={4}>
      <h3>{pelicula.titulo}</h3>
      <p>
        <strong>Director:</strong> {pelicula.director}
      </p>
      <p>
        <strong>Actores:</strong> {pelicula.actoresPrincipales.join(", ")}
      </p>
      <p>
        <strong>Sinopsis:</strong> {pelicula.sinopsis}
      </p>
      <Button variant="danger" onClick={onClose}>
        Cerrar
      </Button>
    </Col>
  </Row>
);

const PeliculaCard = ({ pelicula, onSelect }) => {
  const [showSynopsis, setShowSynopsis] = useState(false);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={pelicula.foto}
        alt={pelicula.titulo}
        style={{
          maxHeight: "200px",
          objectFit: "cover",
          width: "100%",
        }}
      />
      <Card.Body>
        <Card.Title>{pelicula.titulo}</Card.Title>
        <Card.Text>
          <strong>Director:</strong> {pelicula.director}
        </Card.Text>
        <Card.Text>
          <strong>Actores:</strong> {pelicula.actoresPrincipales.join(", ")}
        </Card.Text>
        {showSynopsis && (
          <Card.Text>
            <strong>Sinopsis:</strong> {pelicula.sinopsis}
          </Card.Text>
        )}
        <Button
          variant="info"
          size="sm"
          onClick={() => setShowSynopsis(!showSynopsis)}
        >
          {showSynopsis ? "Ocultar" : "Más"}
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="ms-2"
          onClick={onSelect}
        >
          Seleccionar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default App;

