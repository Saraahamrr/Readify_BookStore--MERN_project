import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./BookDetails.css"; 
import "../components/Loader/Loader";

export default function BookDetails() {
  const [book, setBook] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/books/${id}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
      })
      .catch((rej) => console.log("Error fetching data:", rej));
  }, [id]);

  // لو الكتاب مش متاح بعد أو لسة ما اتحملش، عرض "Loading..."
  if (!book) return <div>Loading...</div>; // أو استخدم Loader الخاص بك هنا

  return (
    <div className="book-details-container">
      <div className="book-image">
        <img
          src={book.coverImage || "placeholder.jpg"} // التأكد أن الصورة موجودة
          alt={book.title || "Unknown Title"} // التأكد من وجود العنوان
        />
      </div>

      <div className="book-info">
        <h3>{book.title || "Unknown Title"}</h3>
        <p><strong>Author(s):</strong> {book.authors?.join(", ") || "Unknown"}</p>
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
