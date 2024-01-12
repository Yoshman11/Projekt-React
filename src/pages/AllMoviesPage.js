import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies } from '../api';

import MovieList from '../components/MovieList'

const AllMoviesList = () => {

    const {search} = useParams()
    const {sort} = useParams()
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState(movies);

    const handleSearch = (searchTerm) => {
        const filtered = movies.filter(movie =>
          movie.titlePL.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    useEffect(() => {
           try {
               getMovies().then(movies => {setMovies(movies)})
           } catch {
               setMovies([])
           }
    }, [])

    return(
            <MovieList content={movies.filter(handleSearch())}/>
        )
}

export default AllMoviesList;