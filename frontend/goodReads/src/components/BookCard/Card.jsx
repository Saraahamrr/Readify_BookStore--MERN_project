import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Card.css"


export default function Card({ book }) {
    const navigate = useNavigate();

    const handleRedirectDetails = (id) => {
        navigate(`/BookDetails/${id}`);
      };

    return (
        <div className="card mx-3 my-4 py-4 " style={{ width: "18rem" }}>
            <img
                src={book.coverImage || "placeholder.jpg"}
                className="card-img-top"
                alt={book.title}
                style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                    <strong>Author:</strong> {book.authors?.join(", ") || "Unknown"}
                </p>
                <button type="button"
          
           onClick={() => handleRedirectDetails(book.id)} className="btn  custom-btn">More Details</button>
           <button className="like-button">
                     <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} /> Like
                   </button>
            </div>
        
        </div>
    );
}
