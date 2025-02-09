import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const FavoritesContext = createContext();


export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    const fetchFavorites = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get("http://localhost:3000/api/get-favourite");
        setFavorites(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    
    fetchFavorites();
  }, []);


  const toggleFavorite = async (bookId) => {
    axios.defaults.withCredentials = true;
    try {
      if (favorites.includes(bookId)) {
        await axios.delete("http://localhost:3000/api/remove-favourite", {
          headers: { bookid: bookId }
        });
        setFavorites((prev) => prev.filter((id) => id !== bookId));
      } else {
        await axios.put("http://localhost:3000/api/add-favourite", null, {
          headers: { bookid: bookId }
        });
        setFavorites((prev) => [...prev, bookId]);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
