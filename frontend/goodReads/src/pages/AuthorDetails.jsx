import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import "./AuthorDetails.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPen
} from "@fortawesome/free-solid-svg-icons";
import authorimage from '../assets/author.jpeg'
import AuthorsContext from '../context/authors';
export default function AuthorDetails() {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();
    const { authors, setAuthors,fetchAuthors } = useContext(AuthorsContext);
    useEffect(() => {
        axios.get(`http://localhost:3000/api/authors/${id}`)
            .then((res) => {
                console.log("API Response:", res.data);
                setAuthor(res.data.author);
                setBooks(res.data.books);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching author details:", err);
                setLoading(false);
            });
    }, [id]);
    const updateAuthor = ()=>{
        navigate(`/update-author/${id}`);

    };
    const deleteAuthor = async (id) => {
        const confirmation = confirm("Are you sure you want to delete this author?");
        if (!confirmation) return;
        try {
          axios.defaults.withCredentials = true;
          const response = await axios.delete(
            `http://localhost:3000/api/authors/${id}`
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
            fetchAuthors();
            setAuthors((prevAuthors) => [...prevAuthors, prevAuthors])
            navigate("/authors");
          }
        } catch (error) {
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
    



    if (loading) return <div>Loading...</div>;
    if (!author) return <div>Author not found</div>;
    console.log("Book in AuthorDetails:", books);
    return (
        <div className="author-details">
            <div className="author-info">
                <div>
                    <div className='d-flex justify-content-center'>
                    <img
                        src={author.image || authorimage}
                        className="card-img-top"
                        alt={author.name}
                        style={{
                            width: "100%",
                            maxWidth: "400px",
                            height: "500px",
                            objectFit: "cover",
                            borderRadius: "10px"
                        }}
                    />
                        {isLoggedIn && role === "admin" && (
                        <div className="d-flex flex-column">
                            <button className="editButton me-2" onClick={() => updateAuthor(id)}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button className="trashButton" onClick={() => deleteAuthor(id)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    )}
                    </div>
                </div>
                <h3>{author.name || "Unknown Author"}</h3>
                <p><strong>Bio:</strong> {author.bio || "No biography available"}</p>
                <p><strong>Date of Birth:</strong> {author.dateOfBirth || "Unknown"}</p>
            </div>
      

            <div className="author-books">

                <h4>Books by {author.name}:</h4>
                {books.length > 0 ? (
                    <ul>
                        {books.map((book) => (
                            <li key={book._id}>
                                {book.title}
                                <Link className="details-btn" to={`/BookDetails/${book._id}`} style={{ marginLeft: "50px", textDecoration: "none" }}>
                                    More Details
                                </Link>
                            </li>
                        ))}
                    </ul>

                ) : (
                    <p>No books found for this author.</p>
                )}
            </div>
        </div>
    );
}
