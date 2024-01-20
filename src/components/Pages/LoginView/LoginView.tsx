import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LoginView = () => {
    const [form, updateForm] = useState({
        login: '',
        password: ''
    });
    const [latestErr, setLatestErr] = useState('');
    const nav = useNavigate();

    const handleFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        updateForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!(form.login && form.password)) return;

        const url = 'https://at.usermd.net/api/user/auth';
        axios
            .post(url, { login: form.login, password: form.password })
            .then((res) => {
                localStorage.setItem('loginToken', res.data.token);
                nav('/');
                window.location.reload();
            })
            .catch((err) => {
                const msg = "Wystąpił błąd w trakcie logowania, spróbuj ponownie później.";
                setLatestErr(msg || '');
                updateForm({
                    login: '',
                    password: ''
                });
            })
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6}>
                    <h1 className="mt-5 text-center">Welcome back!</h1>
                    <Form className="mt-4" onSubmit={(e) => { handleLoginSubmit(e) }}>

                        <Form.Group controlId="login">
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="text" value={form.login} onChange={handleFormOnChange} />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={form.password} onChange={handleFormOnChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4 justify-content-center">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-4 justify-content-center">
                <Col xs={12} sm={8} md={6} className="text-center">
                    <h2>First time here?</h2>
                    <Link to='/register'>
                        <Button variant="secondary">Sign up</Button>
                    </Link>
                </Col>
            </Row>
            {!(latestErr === '') && <div className="mt-4 alert alert-danger text-center">
                {latestErr}
            </div>}
        </Container>
    )
}

export default LoginView;
