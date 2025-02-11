import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

export default function ReadBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // Redirect if user is not logged in
    if (!isLoggedIn) {
      toast.info("Please log in to access this book.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      navigate("/signup");
      return;
    }

    // Fetch book details
    const fetchBookDetails = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `https://readify.railway.internal/api/books/${id}`
        );
        setBook(response.data.book);
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast.error("Failed to load book details.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
        navigate("/allbooks");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, isLoggedIn, navigate]);

  // Loading state
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h3 className="text-muted">Loading...</h3>
      </div>
    );

  // Book not found state
  if (!book)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h3 className="text-danger">Book not found</h3>
      </div>
    );

  // Extract file ID from Google Drive link
  const driveLink = book.fullContent;
  const fileId = driveLink.match(/\/file\/d\/([^\/?]+)/)?.[1]; 
  const embedUrl = fileId
    ? `httpss://drive.google.com/file/d/${fileId}/preview`
    : null;

  return (
    <div className="container d-flex flex-column align-items-center mt-4">
      <h2 className="m-5">{book.title}</h2>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          width="75%"
          className="vh-100 border rounded shadow-lg"
          title="PDF Viewer"
        ></iframe>
      ) : (
        <p className="text-warning">Invalid book link</p>
      )}
    </div>
  );
}