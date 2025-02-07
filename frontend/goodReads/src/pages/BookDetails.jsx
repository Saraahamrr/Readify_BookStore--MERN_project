import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; 
import "./BookDetails.css";

export default function BookDetails() {
  const { id } = useParams(); 
  const [book, setBook] = useState(null); 
  const [loading, setLoading] = useState(true); 


  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/books/${id}`)
      .then((response) => {
        console.log("Fetched book:", response.data); 
        setBook(response.data.book[0]); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id]);


  const handleAddReview = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/books/${id}/rate`, {
        userId: "user123",  // user logged in 
        ratingValue: newRating,
        review: newReview,
      });

      console.log("Review added:", response.data);

     
      setBook((prevBook) => ({
        ...prevBook,
        rates: [...prevBook.rates, { userId: "user123", rating: newRating, review: newReview }],
      }));

      
      setNewRating(0);
      setNewReview("");

    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (loading) return <div>Loading...</div>; 
  if (!book) return <div>Book not found</div>; 

  return (
    <div className="book-details-container">
      <div className="book-image">
        <img src={book.coverImage || "placeholder.jpg"} alt={book.title || "Unknown Title"} />
      </div>

      <div className="book-info">
        <h3>{book.title || "Unknown Title"}</h3>
        <p><strong>Author(s):</strong> {book.authors?.map(author => author.name).join(", ") || "Unknown"}</p>
        <p><strong>Publisher:</strong> {book.publisher || "Unknown"}</p>
        <p><strong>Published Date:</strong> {book.publishedDate ? new Date(book.publishedDate).toDateString() : "Unknown"}</p>
        <p><strong>Categories:</strong> {book.categories?.map(category => category.name).join(", ") || "Unknown"}</p>
        <p><strong>Language:</strong> {book.language || "Unknown"}</p>

        <button className="like-button">
          <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: "30px" }} />
        </button>
        <button className="cart-button">
          <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: "30px", color: "#000000" }} />
        </button>
      </div>

      {/* show reviews */}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {book.rates?.length > 0 ? (
          book.rates.map((review, index) => (
            <div key={index} className="review">
              <p><strong>{review.userId}:</strong> {review.review || "No review text provided"}</p>
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

        {/* add review*/}
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
