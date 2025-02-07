import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./AuthorDetails.css"

export default function AuthorDetails() {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/authors/${id}`)
            .then((res) => {
                setAuthor(res.data.author);
                setBooks(res.data.books);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching author details:", err);
                setLoading(false);
            });
    }, [id]);


    if (loading) return <div>Loading...</div>;
    if (!author) return <div>Author not found</div>;

    return (
        <div className="author-details">
            <div className="author-info">
                <h3>{author.name || "Unknown Author"}</h3>
                <p><strong>Bio:</strong> {author.bio || "No biography available"}</p>
                <p><strong>Date of Birth:</strong> {author.dateOfBirth || "Unknown"}</p>
            </div>

            <div className="author-books">
                <h4>Books by {author.name}:</h4>
                {books.length > 0 ? (
                    <ul>
                        {books.map((book) => (
                            <li key={book._id}>{book.title}
                                <Link className="details-btn" to={`/BookDetails/${book.id}`} state={{ book }} style={{marginLeft:"350px"}}>
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
