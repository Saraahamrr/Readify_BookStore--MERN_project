import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import BooksContext from "../../../context/books";
import Loader from "../../Loader/Loader";
import axios from "axios";
import "./BookManagement.css";

const deleteBook = async (bookId, setBooks,fetchBooks) => {
  const confirmation = confirm("Are you sure you want to delete this book?");
  if (!confirmation) return;
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.delete(
      `http://localhost:3000/api/books/${bookId}`
    );
    console.log(response); // Debugging
    if (response.status === 200) {
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
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
      fetchBooks();
    }
  } catch (error) {
    console.error("Error deleting book:", error);
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

export default function BookManagement() {
  const { books, setBooks, loading,fetchBooks } = useContext(BooksContext);
  const navigate = useNavigate();
  if (loading) return <Loader />;
  const updateBook = (bookId) => {
    navigate(`/update-book/${bookId}`);
  };
  return (
    <div className="d-flex flex-column align-items-center ">
      <div className="table-responsive">

      <table className="my-3 table table-striped table-hover table-light ">
        <thead className="thead-dark" style={{ position: "sticky", top: 0 }}>
          <tr>
            <th className="id" scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">authors</th>
            <th scope="col">categories</th>
            <th scope="col">description</th>
            <th scope="col">Average rating</th>
            <th scope="col">language</th>
            <th scope="col">price</th>
            <th scope="col">edit/delete book</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr scope="row" key={book._id}>
                <td className="id">{book.id}</td>
                <td>{book.title}</td>
                <td>{book.authors?.map((author) => author.name).join(", ")}</td>
                <td>
                  {book.categories?.map((category) => category.name).join(", ")}
                </td>
                <td>
                  <div className="content-wrapper">{book.description}</div>
                </td>
                <td>{(book.averageRating).toFixed(1)}</td>
                <td>{book.language}</td>
                <td>{book.price}</td>
                <td>
                  <button
                    className="editButton"
                    onClick={() => updateBook(book._id)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="trashButton"
                    onClick={() => deleteBook(book._id, setBooks,fetchBooks)}
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
      
    </div>
  );
}
