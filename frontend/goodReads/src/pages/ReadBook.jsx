import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
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
      navigate("/sign-up");
      return;
    }

    const fetchBookDetails = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `http://localhost:3000/api/books/${id}`
        );
        setBook(response.data.book);
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast.error("Failed to load book details.");
        navigate("/allbooks");
      } finally {
        setLoading(false);
      }
    };

    const checkSubscription = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/isSubscribed`
        );
        setIsSubscribed(response.data.isSubscribed);
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    fetchBookDetails();
    checkSubscription();
  }, [id, isLoggedIn, navigate, userId]);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;
  if (!isSubscribed) {
    toast.warning("You must be subscribed to read this book.", {
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
    return null;
  }

  // Construct the Google Drive embed URL
  const driveLink = book.fullContent;
  const fileId = driveLink.match(/\/file\/d\/([^\/]+)\//)?.[1]; // Extract file ID from the Google Drive link
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="pdf-container d-flex flex-column align-items-center">
      <h2 className="pdf-title">{book.title}</h2>
      <iframe
        src={embedUrl}
        width="75%"
        className="vh-100"
        style={{ border: "none" }}
        title="PDF Viewer"
      ></iframe>
    </div>
  );
}
