import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import './Cart.css';


const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const userId = '67a67b09f25cbefeccc347ac'; 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhaW1zIjp7Im5hbWUiOiJTYXJhYWhhbXJyIiwiZW1haWwiOiJzYXJhYWhhbXJyOThAZ21haWwuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzM4OTc0ODI3LCJleHAiOjE3NDE1NjY4Mjd9.vequKkUrwiHOrvnJ6T1KXEd_s6axQEb3BN9qFvGKsl8';

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/cart/get-user-cart?userId=${userId}`, {
                    method: 'GET',
                    headers: { 'auth-token': `bearer ${token}` }
                });

                const data = await response.json();
                if (data.status === 'success') {
                    setCart(data.data);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, [token, userId]);

    // Calculate quantity dynamically
    const quantities = cart.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + 1;
        return acc;
    }, {});

    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Update quantity (increase or decrease)
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(id);
            return;
        }

        const filteredCart = cart.filter(item => item.id !== id);
        const product = cart.find(item => item.id === id);

        setCart([...filteredCart, ...Array(newQuantity).fill(product)]);
    };

    // Calculate total price
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="cart-container">
            <h2 className="cartTitle">Shopping Cart</h2>
            {Object.keys(quantities).length > 0 ? (
                Object.keys(quantities).map(id => {
                    const product = cart.find(item => item.id === Number(id));
                    return (
                        <CartItem
                            key={id}
                            product={product}
                            quantity={quantities[id]}
                            onRemove={removeItem}
                            onUpdateQuantity={updateQuantity}
                        />
                    );
                })
            ) : (
                <p>Your cart is empty.</p>
            )}
            <div className="last-cart">
                <h3 className="totalo">Total: {totalPrice} EGP</h3>
                <button className="checkout" onClick={()=> {navigate('/payment')}}>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;

