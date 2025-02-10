import React, { createContext, useState, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Create a provider to wrap your app and provide cart state
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = async (bookId) => {
        try {
            const response = await fetch('/api/cart/add-to-cart', {
                method: 'PUT',
                headers: {
                    'auth-token': `bearer ${localStorage.getItem("auth-token")}`,
                    'id': 'USER_ID', // Replace with actual logged-in user ID
                    'bookid': bookId,
                },
            });
            const data = await response.json();
            if (data.status === 'success') {
                setCart((prevCart) => [...prevCart, data.data]);
                alert('Book added to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
