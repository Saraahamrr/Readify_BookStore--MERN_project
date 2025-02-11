import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get(
          "http://localhost:3000/api/cart/get-user-cart"
        );
        setCart(response.data.data);

      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  // Calculate quantity dynamically
  const quantities = cart.reduce((acc, item) => {
    acc[item._id] = (acc[item._id] || 0) + 1;
    return acc;
  }, {});

  // const removeItem = (id) => {
  //   setCart(cart.filter((item) => item.id !== id));
  // };

  const removeItem = async (bookId) => {
    axios.defaults.withCredentials = true;
    try {
        console.log("Removing book with ID:", bookId); // Debugging

        const response = await axios.put(
            "http://localhost:3000/api/cart/remove-from-cart",
            { bookid: bookId },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data.status === "success") {
            setCart((prevCart) => prevCart.filter((item) => item._id !== bookId));
            alert("Book removed from cart");
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
        if (error.response) {
            console.error("Backend Response:", error.response.data);
        }
    }
};

  
  

  // Update quantity (increase or decrease)
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const filteredCart = cart.filter((item) => item.id !== id);
    const product = cart.find((item) => item.id === id);

    setCart([...filteredCart, ...Array(newQuantity).fill(product)]);
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-container">
      <h2 className="cartTitle">Shopping Cart</h2>
      {Object.keys(quantities).length > 0 ? (
        Object.keys(quantities).map((id) => {
          const product = cart.find((item) => item._id === id);
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
        <button
          className="checkout"
          onClick={() => {
            navigate("/payment");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
