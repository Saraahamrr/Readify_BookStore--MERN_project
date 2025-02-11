import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Create a context for the cart
const CartContext = createContext();

// Create a provider to wrap your app and provide cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (bookId) => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.put(
        "http://localhost:3000/api/cart/add-to-cart",
        { bookid: bookId }, // Correctly send id & bookid in body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setCart((prevCart) => [...prevCart, response.data.bookid]);
        alert("Book added to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response) {
        console.error("Backend Response:", error.response.data); // Log the actual error
      }
    }
  };

  const removeFromCart = async (bookId) => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.put(
        "http://localhost:3000/api/cart/remove-from-cart",
        { bookid: bookId }, // Correctly send id & bookid in body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setCart((prevCart) => [...prevCart, response.data.data]);
        alert("Book removed from cart");
      }
    } catch (error) {
      console.error("Error removing to cart:", error);
      if (error.response) {
        console.error("Backend Response:", error.response.data); // Log the actual error
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
