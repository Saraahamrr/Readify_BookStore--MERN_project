import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

const Cart = () => {
  // const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const {cart, fetchCart, setCart} = useCart();

  useEffect(() => {
    // const fetchCart = async () => {
    //   axios.defaults.withCredentials = true;
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:3000/api/cart/get-user-cart"
    //     );
    //     setCart(response.data.data);

    //   } catch (error) {
    //     console.error("Error fetching cart:", error);
    //   }
    // };

    fetchCart();
  }, []);

  // Calculate quantity dynamically
  const quantities = cart?.reduce((acc, item) => {
    acc[item._id] = (acc[item._id] || 0) + 1;
    return acc;
  }, {});

const removeItem = async (bookId) => {
  axios.defaults.withCredentials = true;
  try {
    await axios.put("http://localhost:3000/api/cart/remove-from-cart", { bookid: bookId });
    setCart((prevCart) => prevCart.filter((book) => book._id !== bookId));

    toast.info("Book removed from cart", {
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
    toast.error("Error removing book from cart", {
      position: "top-right",
      autoClose: 5000,
      theme: "colored",
      transition: Bounce,
    });
    console.error("Error removing from cart:", error);
  }
};


//   const removeItem = async (bookId) => {
//     axios.defaults.withCredentials = true;
//     try {
//         console.log("Removing book with ID:", bookId); // Debugging

//         const response = await axios.put(
//             "http://localhost:3000/api/cart/remove-from-cart",
//             { bookid: bookId },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         if (response.data.status === "success") {
//             setCart((prevCart) => prevCart.filter((item) => item._id !== bookId));
//             alert("Book removed from cart");
//         }
//     } catch (error) {
//         console.error("Error removing item from cart:", error);
//         if (error.response) {
//             console.error("Backend Response:", error.response.data);
//         }
//     }
// };


const updateQuantity = async (_id, newQuantity) => {
  if (newQuantity <= 0) {
      removeItem(_id);
      return;
  }

  try {
      axios.defaults.withCredentials = true;
      const response = await axios.put(
          "http://localhost:3000/api/cart/update-cart-quantity",
          { bookid: _id, quantity: newQuantity },
          {
              headers: {
                  "Content-Type": "application/json",
              },
          }
      );

      if (response.data.status === "success") {
          setCart((prevCart) =>
              prevCart.map((item) =>
                  item._id === _id ? { ...item, quantity: newQuantity } : item
              )
          );
          console.log("Quantity updated successfully!");
      }
  } catch (error) {
      console.error("Error updating quantity:", error);
  }
};


  // Update quantity (increase or decrease)
  const updateQuantity2 = (_id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(_id);
      return;
    }

    const filteredCart = cart.filter((item) => item._id !== _id);
    const product = cart.find((item) => item._id === _id);

    setCart([...filteredCart, ...Array(newQuantity).fill(product)]);
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
console.log('cart',cart);
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
              onUpdateQuantity={updateQuantity2}
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
            if(totalPrice > 0){
              navigate("/payment", { state: { cart, totalPrice } });
            } else {
              toast.info("Please Add Some Books Your Cart Is Empty", {
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
            }
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
