import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./BookDetails.css"; 

export default function BookDetails() {
  const location = useLocation();
  const book = location.state?.book; 

  if (!book) return <div>Loading...</div>; 

  return (
    <div className="book-details-container">
      <div className="book-image">
        <img src={book.coverImage || "placeholder.jpg"} alt={book.title || "Unknown Title"} />
      </div>

      <div className="book-info">
        <h3>{book.title || "Unknown Title"}</h3>
        <p><strong>Author(s):</strong> {book.authors.name?.join(", ") || "Unknown"}</p>
        <p><strong>Description:</strong> {book.description || "No description available."}</p>
        <p><strong>Publisher:</strong> {book.publisher || "Unknown"}</p>
        <p><strong>Published Date:</strong> {book.publishedDate ? new Date(book.publishedDate).toDateString() : "Unknown"}</p>
        <p><strong>Categories:</strong> {book.categories?.join(", ") || "Unknown"}</p>
        <p><strong>Language:</strong> {book.language || "Unknown"}</p>

        <button className="like-button">
          <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} /> Like
        </button>
      </div>
    </div>
  );
}
