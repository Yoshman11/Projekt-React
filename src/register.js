// RegisterPage.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import zdjecie1 from './Zdjecia/logo.jpg';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleRegister = () => {
   // Assuming you have access to the dispatch function from react-redux
   dispatch(registerUser(formData));
   // You might also make an API request here to register the user
   console.log('Form data for registration:', formData);
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
            <h2 className="text-center">Strona Rejestracji</h2>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} required />
              </Form.Group>

              <Button variant="primary" type="button" onClick={handleRegister}>
                Zarejestruj
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;

