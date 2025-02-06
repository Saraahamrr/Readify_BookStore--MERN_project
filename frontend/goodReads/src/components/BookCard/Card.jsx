import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import { Link } from "react-router-dom";
import StarRating from "../StarRate";

export default function Card({ book }) {
    if (!book) {
        return <div>Loading...</div>; // Or any placeholder message
    }

    const posterURL = book.coverImage || "placeholder.jpg";  // Make sure to handle undefined image
    const bookTitle = book.title || "Unknown Title";
    const authorName = book.authors && book.authors.length > 0 ? book.authors[0].name : 'Unknown';

    return (
        <>
            <div className="card mx-3 my-4 py-4" style={{ width: "18rem" }}>
                <img
                    src={posterURL}
                    className="card-img-top"
                    alt={bookTitle}
                    style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{bookTitle}</h5>

                    <p className="card-text">
                        <strong>Authors:</strong> {authorName}
                    </p>

                    <p className="card-text">
                        <strong>Rating:</strong> <StarRating rating={book.averageRating} />
                    </p>
                    <Link className="details-btn" to="/BookDetails" state={{ book }}>
                        More Details
                    </Link>

                    <div className="btn-group">
                        <button className="like-button">
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                        <button className="cart-button">
                            <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: "20px", color: "#000000" }} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
