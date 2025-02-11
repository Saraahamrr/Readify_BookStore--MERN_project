import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/books");
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); 

  return (
    <BooksContext.Provider value={{ books, setBooks, loading,fetchBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContext;
