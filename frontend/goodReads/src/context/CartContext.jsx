import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;
    
    const fetchCart = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get("http://localhost:3000/api/cart");
        setCart(response.data.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [isLoggedIn]);

  const addToCart = async (bookId) => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.put("http://localhost:3000/api/cart/add-to-cart", { bookid: bookId });
      setCart((prevCart) => [...prevCart, response.data.book]);
      toast.success("Book added to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Error adding book to cart", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

