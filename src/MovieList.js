// MovieList.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Navbar, Form, Button } from 'react-bootstrap';
import Search from './Search';
import zdjecie1 from './Zdjecia/logo.jpg';
import { getMovies, getMovieDetails } from './api';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);

        // Pobierz szczegóły dla każdego filmu
        const detailsPromises = moviesData.map(async (movie) => {
          const details = await getMovieDetails(movie.id);
          return { id: movie.id, details };
        });
        const detailsData = await Promise.all(detailsPromises);

        // Utwórz mapę obiektów szczegółów filmów, używając id jako klucza
        const detailsMap = detailsData.reduce((map, { id, details }) => {
          map[id] = details;
          return map;
        }, {});

        setMovieDetails(detailsMap);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update filteredMovies when movies change
    setFilteredMovies(movies);
  }, [movies]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      // If the search term is empty, show all movies
      setFilteredMovies(movies);
      return;
    }

    const filtered = movies.filter((movie) =>
      movie.titlePL &&
      movie.titlePL.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleGoHome = () => {
    window.location.reload();
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Navbar.Brand onClick={handleGoHome}>
          <img alt="Logo" src={zdjecie1} width="50" height="50" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex" style={{ width: '100%' }}>
            <Search onSearch={handleSearch} className="mr-2" />
            <Link to="/add" className="btn btn-outline-primary mr-2">
              Dodaj Film
            </Link>
            <div className="flex-grow-1"></div>
            <Button variant="outline-primary" onClick={handleGoToLogin}>
              Logowanie
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Row>
        {filteredMovies.map((movie) => {
          const details = movieDetails[movie.id] || {};
          return (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/movies/${movie.id}`} className="text-decoration-none">
                <Card className="mb-3">
                  <Card.Body style={{ display: 'flex' }}>
                    <Card.Img
                      variant="top"
                      src={movie.image}
                      alt={movie.title}
                      style={{
                        width: '150px',
                        height: '200px',
                        objectFit: 'contain',
                        marginRight: '10px',
                      }}
                    />
                    <div>
                      <Card.Title>Tytuł: {movie.title}</Card.Title>
                      <Card.Text>Opis: {movie.content}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
      <Navbar bg="light" expand="lg" className="mt-3" style={{ position: 'sticky', bottom: 0 }}>
        <Navbar.Text>Kacper Białas | Numer Indeksu: 35187</Navbar.Text>
      </Navbar>
    </Container>
  );
};

export default MovieList;
