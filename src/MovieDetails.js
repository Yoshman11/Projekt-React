// MovieDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { getMovies, getMovieDetails } from './api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});

   useEffect(() => {
      const fetchData = async () => {
        try {
          const moviesData = await getMovies();
          setMovie(moviesData);

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

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export default MovieDetails;
