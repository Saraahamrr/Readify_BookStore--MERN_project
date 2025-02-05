import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";

export default function Card({ book }) {
    const navigate = useNavigate();

    const handleRedirectDetails = (id) => {
        navigate(`/BookDetails/${id}`);
    };

    return (
        <div className="card mx-3 my-4 py-4" style={{ width: "18rem" }}>
            <img
                src={book.coverImage || "placeholder.jpg"}
                className="card-img-top"
                alt={book.title}
                style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                
                {/* Loop through authors and display each name */}
                <p className="card-text">
                    <strong>Authors:</strong> {book.authors?.map(author => author.Name).join(", ") || "Unknown"}
                </p>
                <p className="card-text">
                    <strong>Rating:</strong> {book.rating}
                </p>
                
                <button 
                    type="button"
                    onClick={() => handleRedirectDetails(book.id)}
                    className="details-btn"
                >
                    More Details
                </button>

                <div className="btn-group">
                    <button className="like-button">
                        <FontAwesomeIcon icon={faHeart} /> Like
                    </button>
                    <button className="cart-button">
                        <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: "20px", color: "rgb(12, 100, 150)" }} /> 
                    </button>
                </div>
            </div>
        </div>
    );
}
