import { useState, useEffect } from "react";

import { getMovieById, deleteMovie } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { isExpired, decodeToken  } from "react-jwt";
import Button from "../components/Button";

const MoviePage = (params) => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [movieData, setMovieData] = useState({})
    const [pageLoaded, setLoaded] = useState(false)
    const [loadedText, setLoadedText] = useState("Loading!")
    const [loggedIn, setLoggedIn] = useState(!isExpired(localStorage.getItem('token')));
    const [user, setUser] = useState(decodeToken(localStorage.getItem('token')));
    const [errors, setErrors] = useState("")

    const getData = (data, def) => {
            if(data == '' || data == undefined) {
                return def;
            } else {
                return data;
            }
    }

    useEffect(()=>{
        getMovieById(id)
            .then(data => setMovieData(data))
            .then(() => setLoaded(true))
    },[])

    const handleDelete = () => {
        deleteMovie(id)
        .then(() => {
            navigate("/movies")
        })
    }

    const getLoadedPage = () => {
        return (
            <>
                <div className="container-fluid d-flex flex-row mb-3">
                    <div className="col-md-9">
                        <h1 className="mb-4">{getData(movieData.title, "No title")}</h1>
                        <div className="d-flex flex-row justify-content-around" id="additional-info">
                            <span>Year: {getData(movieData.productionYear, "No data")}</span>
                            <span>Genre: {getData(movieData.genre, "No data")}</span>
                            <span>Score: {getData(movieData.rate, "Not rated")}</span>
                        </div>
                        <p className="text-wrap" style={{ fontSize: '1.3rem' }}>
                            {getData(movieData.content, "No description")}
                        </p>
                    </div>
                </div>
                {loggedIn && user.role === "admin" &&
                    <div>
                        <Button onClick={handleDelete} className="btn btn-danger" title="DELETE MOVIE" />
                    </div>
                }
            </>
        );
    }
    return(
           <div className="container-fluid p-2">
               {(pageLoaded) ? getLoadedPage() : <h2>{loadedText}</h2>}
           </div>
       )
   }

export default MoviePage;