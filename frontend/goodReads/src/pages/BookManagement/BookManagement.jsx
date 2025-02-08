import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import BooksContext from "../../context/books";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import "./BookManagement.css";


export const deleteBook = async (bookId, setBooks) => {
  const confirmation = confirm("Are you sure you want to delete this book?");
  if (!confirmation) return;
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/books/${bookId}`,
      { headers: { "auth-token": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhaW1zIjp7Im5hbWUiOiJtZW5uYSIsImVtYWlsIjoiZW1haWxtYWVubmFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTczODc4NjA2MiwiZXhwIjoxNzQxMzc4MDYyfQ.GIZD47utk9sEgH4eHEOBWzW1LX2131yW3UYgQz4jIdE`, id: "67a0ff2e2bd5b05cb1cc4f07" } }

    );
    console.log(response); // Debugging
    if (response.status === 200) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      alert("Book deleted successfully!");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    alert("Failed to delete the book. Please try again.");
  }
};


export default function BookManagement() {
  const { books, setBooks, loading } = useContext(BooksContext);
  if (loading) return <Loader />;
  return (
    <div className="p-5 d-flex flex-column align-items-center">
      <div>
        <button type="button" style={{ backgroundColor: "#fbb02d", border:0, color:"white" }} className="custom-btn sign-btn"
        >+ New book</button>
      </div>
      <table className="m-5 table table-striped table-hover table-dark ">
        <thead className="thead-dark" style={{ position: "sticky", top: 0 }}>
          <tr>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">authors</th>
            <th scope="col">categories</th>
            <th scope="col">describtion</th>
            <th scope="col">Average rating</th>
            <th scope="col">language</th>
            <th scope="col">price</th>
            <th scope="col">delete book</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr scope="row" key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.authors?.map((author) => author.name).join(", ")}</td>
                <td>
                  {book.categories?.map((category) => category.name).join(", ")}
                </td>
                <td>{book.describtion}</td>
                <td>{book.averageRating}</td>
                <td>{book.language}</td>
                <td>{book.price}</td>
                <td>
                  <button
                    className="trashButton"
                    onClick={() => deleteBook(book.id, setBooks)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <Loader />
          )}
        </tbody>
      </table>
    </div>
  );
}

