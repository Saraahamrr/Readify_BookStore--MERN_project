import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '../components/BookCard/Card'
import Loader from '../components/Loader/Loader'
export default function Recent() {
    const [recentBooks, setRecentBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/books/recent-books");
                setRecentBooks(response.data.books);
            } catch (error) {
                console.error("Error fetching recent books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentBooks();
    }, []);

    return (
        <div className="recent-books">
            <h2 style={{marginLeft:"20px"}}>Recently Added</h2>
            {loading ? (
                <Loader />
            ) : recentBooks.length > 0 ? (
                <div className="row" style={{marginLeft:"12px"}} >
                    {recentBooks.map((book) => (
                        <Card key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <p>No recent books available.</p>
            )}
        </div>

    );
}
