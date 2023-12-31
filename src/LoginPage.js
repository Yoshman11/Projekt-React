// LoginPage.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from './Search';
import zdjecie1 from './Zdjecia/logo.jpg';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    console.log('Form data for login:', formData);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Navbar.Brand>
          <Link to="/">
            <img alt="Logo" src={zdjecie1} width="50" height="50" className="d-inline-block align-top" />
          </Link>
        </Navbar.Brand>
      </Navbar>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <h2 className="text-center">Strona Logowania</h2>
            <Form>
            <Form.Group controlId="formLogin">
              <Form.Label>Login:</Form.Label>
              <Form.Control type="text" name="login" value={formData.login} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Hasło:</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} required />
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleLogin}>
              Zaloguj
            </Button>
            </Form>
            </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
