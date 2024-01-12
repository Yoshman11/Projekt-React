import axios from 'axios';

const baseURL = 'https://at.usermd.net';

const api = axios.create({
  baseURL,
});

export const createUser = async (userData) => {
  try {
    const response = await api.post('/api/user/create', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authenticateUser = async (userData) => {
  try {
    const response = await api.post('/api/user/auth', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (userId) => {
  try {
    const response = await api.delete(`/api/user/logout/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMovie = async (movieData) => {
  try {
    const response = await api.post('/api/movies', movieData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMovies = async () => {
  try {
    const response = await api.get('/api/movies');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await api.get(`/api/movies/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async (movieId) => {
  try {
    const response = await api.delete(`/api/movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/api/movies/details/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};