import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/BookCard/Card";
import Loader from "../components/Loader/Loader";
import CategoryContext from "../context/category";

export default function CategoryResults() {
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categories } = useContext(CategoryContext);
  const [category, setCategory] = useState("Category");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://readify-production.up.railway.app/api/categories/${categoryId}/books`
        );

        if (response.data?.books) {
          setBooks(response.data.books);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryId]);

  useEffect(() => {
    const foundCategory = categories?.find((item) => item._id === categoryId);
    if (foundCategory) {
      setCategory(foundCategory.name);
    }
  }, [categoryId, categories]);

  if (loading) return <Loader />;

  return (
    <div className="container text-center">
      <h1 className="title text-start m-5 fw-bold">Books in {category}</h1>

      <div className="row justify-content-center">
        {books.length > 0 ? (
          books.map((book) => <Card key={book._id} book={book} />)
        ) : (
          <div className="alert alert-warning mt-4" role="alert">
            No books found in {category}. 📚
          </div>
        )}
      </div>
    </div>
  );
}
