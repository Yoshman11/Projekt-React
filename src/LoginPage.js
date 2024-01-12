// LoginPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from './Search';
import zdjecie1 from './Zdjecia/logo.jpg';
import { loginUser, logoutUser } from './actions/userActions'; // import akcji do Redux

const LoginPage = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const user = useSelector((state) => state.user || {});// pobierz informacje o użytkowniku ze stanu Redux
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    dispatch(loginUser(formData));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Navbar.Brand>
          <Link to="/">
            <img alt="Logo" src={zdjecie1} width="50" height="50" className="d-inline-block align-top" />
          </Link>
        </Navbar.Brand>
        {user.isAuthenticated ? (
          <Link to="/" className="btn btn-outline-primary" onClick={handleLogout}>
            Wyloguj
          </Link>
        ) : (
          <div>
            <Link to="/login">
              <Button variant="outline-primary">Zaloguj</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline-primary" className="ml-2">
                Rejestracja
              </Button>
            </Link>
          </div>
        )}
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
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {user.isAuthenticated ? (
                <Button variant="primary" type="button" onClick={handleLogout}>
                  Wyloguj
                </Button>
              ) : (
                <Button variant="primary" type="button" onClick={handleLogin}>
                  Zaloguj
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
