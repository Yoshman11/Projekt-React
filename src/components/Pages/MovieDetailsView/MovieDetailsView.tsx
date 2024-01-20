import React, { useEffect, useState } from "react";
import { RouteProps, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap components

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import trashIcon from '../../../assets/icons/trashIcon.png';

const MovieDetailsView = () => {
  const params = useParams();
  const nav = useNavigate();

  const [movie, setMovie] = useState({
    id: "",
    title: "",
    image: "",
    content: "",
    rate: "",
    genre: "",
    productionYear: "",
    directors: [],
    writers: [],
    madeIn: "",
    released: "",
  });

  const [isTrashVisible, setTrashVisible] = useState(false);
  const [isRemovalModalVisible, toggleRemovalModal] = useState(false);

  useEffect(() => {
    const url = 'https://at.usermd.net/api/movies/' + params.id;
    console.log(url);
    axios.get(url).then((res) => {
      setMovie(res.data);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      setTrashVisible(true);
    }
  }, []);

  const handleMovieRemoval = () => {
    const url = 'https://at.usermd.net/api/movie/' + params.id;
    console.log('hello');
    axios
      .delete(url, {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('loginToken'),
        },
      })
      .then(() => {
        nav('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const starEmoji = '⭐';

  return (
    <>
      {/* Removal Modal */}
      <Modal show={isRemovalModalVisible} onHide={() => toggleRemovalModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Do you really want to remove {movie.title}?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleMovieRemoval()}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => toggleRemovalModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Movie Details */}
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src={movie?.image} className="img-fluid" alt={movie.title} />
          </div>
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="display-4">{movie?.title || 'unknown'}</h1>
              <img
                src={trashIcon}
                className="trash-icon"
                style={{ width: '50px', height: '50px' }} // Set the size here
                onClick={() => toggleRemovalModal(true)}
                alt="Delete"
              />
            </div>
            <h2 className="lead">{movie?.productionYear || ' '}</h2>
            <table className="table">
              <tbody>
                <tr>
                  <td>Director</td>
                  <td>{movie?.directors?.join(', ') || 'unknown'}</td>
                </tr>
                <tr>
                  <td>Writers</td>
                  <td>{movie?.writers?.join(', ') || 'unknown'}</td>
                </tr>
                <tr>
                  <td>Genres</td>
                  <td>{movie?.genre || 'unknown'}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>{movie?.rate ? starEmoji.repeat(Number(movie?.rate)) : 'none'}</td>
                </tr>
                <tr>
                  <td>Released</td>
                  <td>{movie?.released || 'unknown'}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{movie?.content || 'No description provided.'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetailsView;
