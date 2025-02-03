import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo-removebg-preview.png';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
import "../Header/header.css";

export default function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
                <img className="navbar-brand" src={logo} alt="Logo" style={{ width: "250px", height: "100px", marginLeft: "20px" }} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/allbooks">Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About-us</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-book">Add Book</Link>
                        </li>
                        {/* <Link type="button" className="btn btn-primary custom-btn" style={{ backgroundColor: "gray" }} to="/login">login</Link> */}
                        <Link type="button" className="btn btn-primary sign-btn" style={{ backgroundColor: "rgb(16, 127, 187)" }} to="/signup">sign in</Link>
                    </ul>
                </div>
            </nav>
        </>
    );
}
