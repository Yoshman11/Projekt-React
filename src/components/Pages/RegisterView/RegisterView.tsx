import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Form, Button } from 'react-bootstrap'; // Import Bootstrap components

const RegisterView = () => {
    const nav = useNavigate();
    const [form, updateForm] = useState({
        login: '',
        email: '',
        password: '',
    });
    const [formMsg, setFormMsg] = useState({
        isGood: false,
        content: '',
    });

    const handleFormOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        updateForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!(form.login && form.email && form.password)) return;

        const url = 'https://at.usermd.net/api/user/create';
        axios
            .post(url, { name: form.login, email: form.email, password: form.password })
            .then((res) => {
                setFormMsg({
                    isGood: true,
                    content: 'Your account was successfully created!',
                });
                setTimeout(() => {
                    nav('/login');
                    window.location.reload();
                }, 2000); // timeout po 2 sekundach
            })
            .catch(() => {
                setFormMsg({
                    isGood: false,
                    content: 'Your account couldn\'t be created. Try again later.',
                });
            });
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Already registered?</h2>
                        <Link to="/login">
                            <Button variant="primary">Sign in</Button>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <h1 className="display-4">Welcome!</h1>
                        <Form onSubmit={(e) => handleRegisterSubmit(e)}>
                            <Form.Group controlId="login">
                                <Form.Label>Login</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="login"
                                    onChange={(e) => handleFormOnChange(e)}
                                    value={form.login}
                                />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={(e) => handleFormOnChange(e)}
                                    value={form.email}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={(e) => handleFormOnChange(e)}
                                    value={form.password}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
            {!(formMsg.content === '') && (
                <div className={!formMsg.isGood ? 'alert alert-danger' : 'alert alert-success'}>
                    {formMsg.content}
                </div>
            )}
        </>
    );
};

export default RegisterView;
