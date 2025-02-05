import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SearchResult() {
  const [books, setBooks] = useState([]);
  const { query } = useParams(); // Extract query parameter from URL


  useEffect(() => {
    if (query) {
        console.log("Searching for:", query);  
        axios
        axios
        .get(`http://localhost:3000/api/books/search?query=${query}`)
        .then((res) => {
            console.log("API Response:", res.data);
            setBooks(res.data.results);
        })
        .catch((err) => console.log("Error fetching data:", err));
    
    }
}, [query]);



  // Check if no books were found and display a message
  if (!books || !books.length) {
    return <div>No books found for "{query}"</div>;
  }

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Search Results for "{query}"</h1>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map((book) => (
          <div className="col" key={book._id}>
            <div className="card">
              <img
                src={book.coverImage}
                className="card-img-top"
                alt={book.title}
              />

              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  <strong>Author(s):</strong> {book.authors.join(", ")}
                </p>
                <p className="card-text">
                  <strong>Category:</strong> {book.categories.join(", ")}
                </p>
                <p className="card-text">
                  <strong>Rating:</strong> {book.rate}
                </p>
                <p className="card-text">{book.description}</p>
                <a href={`/books-details/${book._id}`} className="btn btn-warning">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
