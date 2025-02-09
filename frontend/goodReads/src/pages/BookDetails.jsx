import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faHeart, faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./BookDetails.css";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const updateBook = (bookId) => {
    navigate(`/update-book/${bookId}`)
  }

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:3000/api/books/${id}`)
      .then((response) => {
        setBook(response.data.book[0] || response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id]);

  const deleteBook = async (bookId) => {
    const confirmation = confirm("Are you sure you want to delete this book?");
    if (!confirmation) return;
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.delete(
        `http://localhost:3000/api/books/${bookId}`
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        navigate('/allbooks')
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleAddReview = async () => {
    try {
      await axios.post(`http://localhost:3000/api/books/${id}/rate`, {
        userId: "user123",
        ratingValue: newRating,
        review: newReview,
      });

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

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  };

  const handleFavourites = async () => {
    const response = await axios.put("http://localhost:3000/api/add-favourite", {}, { headers });
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put("http://localhost:3000/api/cart/add-to-cart", {}, { headers });
    alert(response.data.message);
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex flex-row justify-content-between gap-1 py-5 container-">
        <div className="flex-grow-1 d-flex flex-wrap w-50">
          <div className="book-image me-4">
            <img src={book.coverImage || "placeholder.jpg"} alt={book.title || "Unknown Title"} />
          </div>

          <div className="book-info">
            <h3>{book.title || "Unknown Title"}</h3>
            <p><strong>Author(s):</strong> {book.authors?.map(author => author.name).join(", ") || "Unknown"}</p>
            <p><strong>Description:</strong> {book.description|| "no desription"}</p>
            <p><strong>Publisher:</strong> {book.publisher || "Unknown"}</p>
            <p><strong>Published Date:</strong> {book.publishedDate ? new Date(book.publishedDate).toDateString() : "Unknown"}</p>
            <p><strong>Categories:</strong> {book.categories?.map(category => category.name).join(", ") || "Unknown"}</p>
            <p><strong>Language:</strong> {book.language || "Unknown"}</p>

            {isLoggedIn === true && role === "user" && <>
              <button className="like-button" onClick={handleFavourites}>
                <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: "30px" }} />
              </button>

              <button className="cart-button" onClick={handleCart}>
                <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: "30px", color: "#000000" }} />
              </button>
            </>}

            {isLoggedIn === true && role === "admin" && <div className="d-flex mt-3">
              <button className="editButton me-2" onClick={() => updateBook(id)}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="trashButton" onClick={() => deleteBook(id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>}
          </div>
        </div>

        {/* Reviews Section (on the right) */}
        <div className="reviews-section w-50">
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

          {/* Add Review Section */}
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
    </div>
  );
}
