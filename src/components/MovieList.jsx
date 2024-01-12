import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isExpired, decodeToken  } from "react-jwt";

import MovieCard from './MovieCard';
import Button from './Button';

const MovieList = (params) => {
    const movies = params.content
    const [size, setsize] = useState(1)
    const [loggedIn, setLoggedIn] = useState(!isExpired(localStorage.getItem('token')));

    const getParamSearch = () => {
        if(params.search == undefined) {
            return (x) => {return true};
        } else {
            return params.search;
        }
    }

    const defaultStyle = {
        width: '10rem'
    }

    return(
            <div>
                <div className='d-flex flex-row justify-content-around'>
                    <div className='mb-2'>
                        <span className='ms-2 me-2'>Icon size:</span>
                        <span className='ms-2 me-2'>{size}</span>
                    </div>
                    {(loggedIn) &&
                    <div>
                    <Link to="/add"><Button className="btn-sm btn-outline-secondary" title={<div><span>ADD MOVIE </span></div>}/></Link>
                </div>}
                </div>
                    {(movies.length == 0) ? <h3>NO MOVIES</h3> :
                        <div className="d-flex flex-row flex-wrap justify-content-center" >
                            {movies.filter(getParamSearch()).map((movie) => <MovieCard style={defaultStyle} size={size-1} year={movie.productionYear} cover={movie.image} genre={movie.genre} rate={movie.rate} title={movie.title} description={movie.content} id={movie.id} />)}
                        </div>
                    }
                <div>
                    pagination here
                </div>
            </div>
        )
    }

    export default MovieList;