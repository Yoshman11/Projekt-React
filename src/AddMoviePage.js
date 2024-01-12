import React, { useState } from 'react';
import { Form, Button, Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import zdjecie1 from './Zdjecia/logo.jpg';


const AddMoviePage = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    title: '',
    image: '',
    content: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tutaj możesz dodać logikę obsługi przesyłania danych (np. wysłanie ich do API)
    setMovieData({
      title: '',
      image: '',
      content: ''
    });
  };

  const handleGoHome = () => {
      navigate('/');
  };

  return (
    <Container>
        <Navbar bg="light" expand="lg" className="mb-3">
            <Navbar.Brand onClick={handleGoHome}>
              <img alt="Logo" src={zdjecie1} width="50" height="50" className="d-inline-block align-top" />
            </Navbar.Brand>
        </Navbar>
      <h2 className="mt-3">Dodawanie Nowego Filmu</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="formTitle">
          <Form.Label>Tytuł:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Obrazek URL:</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={movieData.image}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formContent">
          <Form.Label>Opis:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            value={movieData.content}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Dodaj Film
        </Button>
      </Form>
    </Container>
  );
};

export default AddMoviePage;
