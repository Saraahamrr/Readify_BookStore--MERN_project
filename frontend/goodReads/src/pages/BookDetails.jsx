import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar,faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./BookDetails.css";

export default function BookDetails() {
  const location = useLocation();
  const book = location.state?.book;

  const [reviews, setReviews] = useState(book?.rates || []);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");

  if (!book) return <div>Loading...</div>;

  const handleAddReview = () => {
    if (newRating > 0 && newReview.trim() !== "") {
      const newReviewObj = { userId: "Guest", rating: newRating, review: newReview };
      setReviews([...reviews, newReviewObj]);
      setNewRating(0);
      setNewReview("");
    }
  };

  return (
    <div className="book-details-container">
      <div className="book-image">
        <img src={book.coverImage || "placeholder.jpg"} alt={book.title || "Unknown Title"} />
      </div>

      <div className="book-info">
        <h3>{book.title || "Unknown Title"}</h3>
        <p><strong>Author(s):</strong> {book.authors?.map(author => author.name).join(", ") || "Unknown"}</p>

        {/* <p><strong>Description:</strong> {book.description || "No description available."}</p> */}
        <p><strong>Publisher:</strong> {book.publisher || "Unknown"}</p>
        <p><strong>Published Date:</strong> {book.publishedDate ? new Date(book.publishedDate).toDateString() : "Unknown"}</p>
        <p><strong>Categories:</strong> {book.categories?.map(category => category.name).join(", ") || "Unknown"}</p>

        <p><strong>Language:</strong> {book.language || "Unknown"}</p>

        <button className="like-button">
          <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize:"30px" }} />
        </button>
        <button className="cart-button">
          <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: "30px", color: "#000000" }} />
        </button>
      </div>

      {/* Reviews  */}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p><strong>{review.userId}:</strong> {review.review}</p>
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    style={{ color: i < review.rating ? "#FFD700" : "#ccc" }}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        {/* Add Review */}
        <div className="add-review">
          <h4>Add Your Review</h4>
          <div className="rating-input">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                style={{ color: i < newRating ? "#FFD700" : "#ccc", cursor: "pointer" }}
                onClick={() => setNewRating(i + 1)}
              />
            ))}
          </div>
          <textarea
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button onClick={handleAddReview} disabled={newRating === 0 || newReview.trim() === ""}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
