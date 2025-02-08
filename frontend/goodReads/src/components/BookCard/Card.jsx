import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import { Link } from "react-router-dom";
import StarRating from "../StarRate";
import authorimage from '../../assets/author.jpeg'

export default function Card({ book, author }) {
    if (!book && !author) {
        return <div>Loading...</div>;
    }


    const posterURL = book?.coverImage || "placeholder.jpg";
    const bookTitle = book?.title || "Unknown Title";
    const bookAuthors = book?.authors?.map(a => a.name).join(", ") || "Unknown";


    const authorName = author?.name || "Unknown Author";
    const authorBio = author?.bio || "No biography available";
    const authorImage = author?.image 

    return (
        <div className="card mx-3 my-4 py-4" style={{ width: "18rem" }}>

            {book && (
                <>
                    <img
                        src={posterURL}
                        className="card-img-top"
                        alt={bookTitle}
                        style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{bookTitle}</h5>
                        <p className="card-text"><strong>Authors:</strong> {bookAuthors}</p>
                        <div className="card-text mb-3"><strong>Rating:</strong> <StarRating rating={book.averageRating} /></div>

                        <Link
                            className="details-btn"
                            to={`/BookDetails/${book._id}`}
                            state={{ book }}
                            style={{ textDecoration: "none" }}
                        >
                            More Details
                        </Link>


                        <div className="btn-group">
                            <button className="like-button"><FontAwesomeIcon icon={faHeart} /></button>


                            <button className="cart-button">
                                <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: "20px", color: "#000000" }} />
                            </button>
                        </div>
                    </div>
                </>
            )}


            {author && (
                <div className="card-body">
                    <img
                        src={authorImage ||authorimage }
                        className="card-img-top"
                        alt={authorName}
                        style={{ height: "300px", objectFit: "cover" }}
                    />
                    <h5 className="card-title">{authorName}</h5>
                    <p className="card-text">{authorBio}</p>
                    <Link className="details-btn" to={`/AuthorDetails/${author._id}`} state={{ book }} style={{ textDecoration: "none" }}>
                        More Details
                    </Link>
                </div>
            )}
        </div>
    );
}
