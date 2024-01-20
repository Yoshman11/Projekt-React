import React, { InputHTMLAttributes, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import MoviePreview from "../MoviePreview/MoviePreview";
import { Link } from "react-router-dom";
import axios from "axios";
import Searchbar from "../Searchbar/Searchbar";

const Section = (props: Props) => {

    const [movies, setMovies] = useState([]);
    const [failedToLoad, toggleFailedToLoad] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const url = 'https://at.usermd.net/api/movies';
        axios
            .get(url)
            .then((res) => {
                setMovies(res.data);
                setFilteredMovies(res.data);
            })
            .catch((err) => {
                toggleFailedToLoad(true);
            })
    }, [])

    const mapAsLink = (mv: MovieInterface) => {
        return (
            <Col key={mv.id} md={3} className="mb-4">
                <Link to={'/details/' + mv.id} style={{ textDecoration: 'none', color: 'black' }}>
                    <MoviePreview name={mv.title} img={mv.image} />
                </Link>
            </Col>
        )
    }

    const handleChangedInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const filtered = movies.filter((v: MovieInterface) => v.title.toLowerCase().trim().match(e.target.value.toLowerCase().trim()));
        setFilteredMovies(filtered);
        console.log(filtered);
    }

    return (
        <Container className="py-4">
            <Searchbar onChange={handleChangedInput} />

            <h2 className="mb-4">{props.title}</h2>
            <span className="text-muted mb-4">{props.subtitle}</span>
            <Row>
                {
                    filteredMovies.length !== 0 ?
                        filteredMovies.map((mv) => mapAsLink(mv)) :
                        <span className="text-muted">We couldn't find any movies :c</span>
                }
            </Row>
        </Container>
    )
}

export default Section;

interface Props {
    title: string,
    subtitle: string,
}

interface MovieInterface {
    id: string,
    title: string,
    image: string,
}
