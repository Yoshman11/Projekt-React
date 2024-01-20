import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Navbar } from 'react-bootstrap';  // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Searchbar from "../Searchbar/Searchbar";
import userIcon from '../../assets/icons/userIcon.png';
import MainView from "../Pages/MainView/MainView";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('loginToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loginToken');
        setIsLoggedIn(false);
        nav('/');
        window.location.reload();
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <div>
                    <Link to='/' className="navbar-brand">FilmHub</Link>
                </div>

                <div>
                    <Link to='/add' className="nav-item nav-link">
                        <Button variant="outline-primary" className="mr-2">Add Movie</Button>
                    </Link>
                    {!isLoggedIn ?
                        <Link to='/login' className="nav-item nav-link">
                            <Button variant="primary">Sign in</Button>
                        </Link>
                        :
                        <Button variant="danger" onClick={() => handleLogout()}>Sign out</Button>
                    }
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
