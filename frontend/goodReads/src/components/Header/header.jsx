import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo3.png";
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
        <img className="navbar-brand" src={logo} alt="Logo" style={{ width: "100px", height: "100px", marginLeft: "20px" }} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex justify-content-end w-100">

            <form className="d-flex" role="search" style={{ backgroundColor: "#f8f9fa", justifyContent: "center", position: "relative", width: "100%" }} onSubmit={handleSearch}>
              <div style={{ position: "relative", width: "50%" }}>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingRight: "40px" }}  // Space for the button
                />
                <button type="submit" style={{
                  position: "absolute",
                  right: "-30px",  // Slightly closer to the edge
                  top: "13%",
                  transform: "translateY(-50%)",
                  backgroundColor: "#fbb02d",
                  border: "none",
                  cursor: "pointer",
                  padding: "5px",
                }}>
                  <FontAwesomeIcon icon={faSearch} style={{ color: "#111111", fontSize: "20px" }} />
                </button>
              </div>
            </form>


            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/allbooks">Books</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/add-book">Add book</Link></li>
            <li className="nav-item"><Link className="btn  sign-btn" to="/signup" style={{ backgroundColor: "#fbb02d", marginRight: "20px" }}>Sign up</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
