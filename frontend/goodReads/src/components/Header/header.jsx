import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo-removebg-preview.png';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../Header/header.css";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState(""); // Store the search query
    const navigate = useNavigate(); // For navigation after search

    // Handle search when the button is clicked
    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
          try {
            const res = await axios.get(`http://localhost:3000/api/books?search=${query}`);
            setBooks(res.data); // عرض البيانات الخاصة بالبحث
          } catch (err) {
            console.error('Error during search:', err);
          }
        }
      };
      
    

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
                <div className="container-fluid">
                    <img className="navbar-brand" src={logo} alt="Logo" style={{ width: "180px", height: "80px", marginLeft: "20px" }} />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/allbooks">Books</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                        </ul>

                        {/* Search Bar */}
                        <form className="d-flex mx-auto search-bar" style={{backgroundColor:"#f8f9fa"}} onSubmit={handleSearch}>
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Search..." 
                                aria-label="Search" 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} // Update search query value
                            />
                            <button 
                                className="btn btn-primary sign-btn" 
                                type="submit" 
                                style={{backgroundColor:"rgb(16, 127, 187)"}}
                            >
                                Search
                            </button>
                        </form>

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">About-us</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <Link type="button" className="btn btn-primary sign-btn" style={{ backgroundColor: "rgb(16, 127, 187)" }} to="/signup">Sign up</Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
