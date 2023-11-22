// MovieList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Navbar, Form } from 'react-bootstrap';
import Search from './Search';
import zdjecie1 from './Zdjecia/logo.jpg';
import zdjecie2 from './Zdjecia/film.jpg';


const MovieList = () => {
  const allMovies = [
    { id: 1, titlePL: "Tytuł Filmu 1", review: "Recenzja: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis.", rating: 4.5, image: zdjecie2 },
    { id: 2, titlePL: "Tytuł Filmu 2", review: "Recenzja: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis.", rating: 3.8, image: zdjecie2 },
    { id: 3, titlePL: "Tytuł Filmu 3", review: "Recenzja: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis.", rating: 2.8, image: zdjecie2 },
    { id: 4, titlePL: "Tytuł Filmu 4", review: "Recenzja: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis.", rating: 1.8, image: zdjecie2 },
    { id: 5, titlePL: "Tytuł Filmu 5", review: "Recenzja: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis.", rating: 3.2, image: zdjecie2 },
    { id: 6, titlePL: "Tytuł Filmu 6", review: "Recenzja: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis.", rating: 1.4, image: zdjecie2 },
    { id: 7, titlePL: "Tytuł Filmu 7", review: "Recenzja: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis.", rating: 5.8, image: zdjecie2 },
    { id: 8, titlePL: "Tytuł Filmu 8", review: "Recenzja: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis.", rating: 3.1, image: zdjecie2 },
    { id: 9, titlePL: "Tytuł Filmu 9", review: "Recenzja: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis.", rating: 3.3, image: zdjecie2 },
  ];

  const [filteredMovies, setFilteredMovies] = useState(allMovies);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    const filtered = allMovies.filter(movie =>
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
                  <img alt="Logo" src={zdjecie1} width="50" height="50" className="d-inline-block align-top"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex" style={{ width: '100%' }}>

            <Search onSearch={handleSearch} className="mr-2" />
            <div className="flex-grow-1"></div>
            <Button variant="outline-primary" onClick={handleGoToLogin}>Logowanie</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Row>
        {filteredMovies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-3">
                <Card.Body style={{ display: 'flex' }}>
                    <Card.Img variant="top" src={movie.image} alt={movie.titlePL} style={{ width: '150px', height: '200px', objectFit: 'contain', marginRight: '10px' }}/>
                <div>
                    <Card.Title>{movie.titlePL}</Card.Title>
                    <Card.Text>{movie.review}</Card.Text>
                    <Card.Text>Ocena: {movie.rating}</Card.Text>
                </div>
                </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
       <Navbar bg="light" expand="lg" className="mt-3" style={{ position: 'sticky', bottom: 0 }}>
            <Navbar.Text>
                Kacper Białas | Numer Indeksu: 35187
            </Navbar.Text>
       </Navbar>
    </Container>
  );
};

export default MovieList;
