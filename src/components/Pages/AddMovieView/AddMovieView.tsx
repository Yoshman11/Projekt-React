import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMovieView = () => {
  const nav = useNavigate();
  const [form, updateForm] = useState({
    title: "",
    image: "",
    content: "",
    genre: "",
    rate: "",
  });
  const [formMsg, setFormMsg] = useState({
    isGood: false,
    content: "",
  });

  // check if user is logged in - if not, he can't add stuff
  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (!token) {
      nav("/login");
    }
  }, []);

  const handleFormOnChange = (err: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    err.preventDefault();
    updateForm({
      ...form,
      [err.target.name]: err.target.value,
    });
  };

  const handleFormSubmit = (err: React.FormEvent<HTMLFormElement>) => {
    err.preventDefault();
    if (!(form.title && form.content && form.genre && form.rate && form.image))
      return;

    const url = "https://at.usermd.net/api/movies";
    axios
      .post(url, {
        title: form.title,
        image: form.image,
        content: form.content,
        genre: form.genre,
        rate: form.rate,
      })
      .then((res) => {
        setFormMsg({
          isGood: true,
          content: "Your movie was successfully added!",
        });

        setTimeout(() => {
          nav("/");
        }, 2000);
      })
      .catch((err) => {
        setFormMsg({
          isGood: false,
          content: "There was an error while adding your movie.",
        });
      });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <h1>Add new movie 🎥</h1>
            <Form onSubmit={(e) => handleFormSubmit(e)}>
              <Form.Group controlId="title">
                <Form.Label>Movie name</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={(e) => handleFormOnChange(e)}
                  value={form.title}
                />
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Poster URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  onChange={(e) => handleFormOnChange(e)}
                  value={form.image}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="content"
                  onChange={(e) => handleFormOnChange(e)}
                  value={form.content}
                />
              </Form.Group>

              <Form.Group controlId="genre">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  onChange={(e) => handleFormOnChange(e)}
                  value={form.genre}
                />
              </Form.Group>

              <Form.Group controlId="rate">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="text"
                  name="rate"
                  onChange={(e) => handleFormOnChange(e)}
                  value={form.rate}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {!(formMsg.content === "") && (
        <Alert
          variant={formMsg.isGood ? "success" : "danger"}
          className="mt-3"
        >
          {formMsg.content}
        </Alert>
      )}
    </>
  );
};

export default AddMovieView;
