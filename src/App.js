// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './MovieList';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import MovieDetails from './MovieDetails';
import AddMoviePage from './AddMoviePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/details" element={<MovieDetails />} />
        <Route path="/add" element={<AddMoviePage />} />
      </Routes>
    </Router>
  );
};

export default App;
