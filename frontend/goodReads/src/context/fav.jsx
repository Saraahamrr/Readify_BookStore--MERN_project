import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { authActions } from "../store/authSlicer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchFavorites = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-favourite"
        );
        setFavorites(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [isLoggedIn]);

  const toggleFavorite = async (bookId) => {
    axios.defaults.withCredentials = true;
    console.log(favorites);

    try {
      if (favorites.some((book) => book._id === bookId)) {
        await axios.delete("http://localhost:3000/api/remove-favourite", {
          headers: { bookid: bookId },
        });
        setFavorites((prev) => prev.filter((book) => book._id !== bookId));
        return false; // Book was removed
      } else {
        await axios.put("http://localhost:3000/api/add-favourite", null, {
          headers: { bookid: bookId },
        });
        setFavorites((prev) => [...prev, { _id: bookId }]); // Assuming only _id is needed
        return true; // Book was added
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong!", {
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
      return favorites.some((book) => book._id === bookId); // Return previous state on error
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
