import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-removebg-preview.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../Header/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container-fluid">
        <img className="navbar-brand" src={logo} alt="Logo" style={{ width: "180px", height: "80px", marginLeft: "20px" }} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex justify-content-end w-100">

            <form className="d-flex" role="search" style={{  backgroundColor:"#f8f9fa" }} onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
              />
              <button className="btn btn-warning custom-btn mx-3" type="submit" style={{ marginBottom: '20px' , backgroundColor:"rgb(16, 127, 187)",border:"1px solid rgb(16, 127, 187 " }}>
                Search
              </button>
            </form>
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/allbooks">Books</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
            <li className="nav-item"><a className="nav-link" href="#">About-us</a></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
            <li className="nav-item"><Link className="btn btn-primary sign-btn" to="/signup">Sign up</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
