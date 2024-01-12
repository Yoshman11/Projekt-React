import { Link, useNavigate } from "react-router-dom";

import Button from "./Button";
import { useState, useEffect } from "react";
import { isExpired, decodeToken  } from "react-jwt";

const Navigation = () => {
    const navigate = useNavigate();
    const [searchState, setSearchState] = useState("")
    const [loggedIn, setLoggedIn] = useState();
    const [user, setUser] = useState(decodeToken(localStorage.getItem('token')));

    useEffect(() => {
        setUser(decodeToken(localStorage.getItem('token')));
    }, [loggedIn]);

    useEffect(() => {
        setLoggedIn(!isExpired(localStorage.getItem('token')));
    }, [])



    const handleProfilePath = () => {
        if(loggedIn) {
            return "profile";
        } else {
            return "signin";
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const searchLink = searchState.replace(' ', '+')
        navigate("/movies/"+searchLink);
    }

    return(
        <nav className="navbar navbar-expand-lg bg-color-primary rounded-pill p-1 m-3" style={{position: "fixed", top: "5px", margin: "auto", zIndex: 3, width: "80%", boxShadow: "0px 8px 23px -11px rgba(0, 0, 0, 0.4)"}} >
            <div className="container-fluid flex-row justify-content-between">
                <Link to='/' relative="/" className="navbar-brand" href>Movie</Link>
                <form onSubmit={handleSearch} className="d-flex w-50" role="search">
                    <input className="form-control me-1 rounded-pill" value = {searchState} name="search" type="search" placeholder="Search movies..." aria-label="Search" onChange={e => {setSearchState(e.target.value)}}/>
                    <Button onClick={handleSearch} className="btn btn-outline-secondary" type="submit" title={<img src={searchIcon} className="img-fluid mb-1"></img>}/>
                </form>
                <Link to={handleProfilePath()} relative="/"><Button className="btn justify-content-center" aria-expanded="false" title={<ProfileBubble name={(loggedIn) ? user.name : ""} loggedIn={loggedIn}/>}/></Link>
            </div>


        </nav>
    )
}

export default Navigation;
