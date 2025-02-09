import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []); 

  return (
    <BooksContext.Provider value={{ books, setBooks, loading }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContext;
