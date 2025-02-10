import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/get-user-cart', {
                method: 'GET',
                headers: {
                    'auth-token': `Bearer ${localStorage.getItem("auth-token")}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (data.status === 'success') {
                setCart(data.data); // Set cart with fetched items
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchCart(); // Fetch cart when app loads
    }, []);

    const addToCart = async (bookId) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/add-to-cart', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `bearer ${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({
                    userId: localStorage.getItem("userId"),  // Send user ID properly
                    bookId: bookId
                })
            });

            const data = await response.json();
            if (data.status === 'success') {
                console.log("Cart updated:", data.data);
                setCart((prevCart) => [...prevCart, data.data]);  // Append new item
                alert('Book added to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

     // Get total number of cart items
     const cartItemCount = cart.length;

    return (
        <CartContext.Provider value={{ cart, addToCart, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
