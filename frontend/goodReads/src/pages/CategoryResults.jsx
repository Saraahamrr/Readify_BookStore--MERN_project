import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/BookCard/Card";
import Loader from "../components/Loader/Loader";

export default function CategoryResults() {
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/categories/${categoryId}/books`
        );
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryId]);

  if (loading) return <Loader />;

  return (
    <div className="container text-center">
      <h1 className="title text-start m-5 fw-bold">Books in this Category</h1>

      <div className="row justify-content-center">
        {books.length > 0 ? (
          books.map((book) => <Card key={book._id} book={book} />)
        ) : (
          <div className="alert alert-warning mt-4" role="alert">
            No books found in this category. 📚
          </div>
        )}
      </div>
    </div>
  );
}
