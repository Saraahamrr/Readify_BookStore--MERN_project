import "./Checkout.css";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPayment } from "../../services/api";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import "./PaymentPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { sendOtp, verifyOtp } from "../../services/api"; 
import axios from "axios";
import { useCart } from "../../context/CartContext";


// Load Stripe
const stripePromise = loadStripe(
  "pk_test_51QpuysRruMS7ZCYMM6M3ZkuWggbceDGTOLzA9n1KOsu5CFt6kkp8Mr4yxd9UmIE4hXUEar5Wxshd2wDXJVMuU0EN003BCuwz0c"
);

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    promoCode: "",
    number: "",
    state: ""
  });
  const [otp, setOtp] = useState("");
  const [orderDetails, setOrderDetails] = useState(""); // Example: "Book A, Book B"
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0; // Fallback to 0 if undefined
  const cart = location.state?.cart;

console.log('cart', cart);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
console.log('location', location.state.cart)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded.");
      return;
    }

    // Get the card element
    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      console.error("CardNumberElement not found.");
      return;
    }

    try {
      // Create a payment intent on the backend
      const { data } = await createPayment({ amount: 500, currency: "usd" });

      // Confirm the payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardNumberElement,
  },
});


if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
  setPaymentSuccess(true);

  // Display success toast notification
  toast.success("Payment Successful!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  //Step 1: Send Order to Backend
  const userId = localStorage.getItem("userId"); // Ensure user ID is stored when logging in

  const response = await axios.post("https://readify.railway.internal/api/order/place-order", {
    books: cart,
    totalPrice: totalPrice
  });

  console.log("Order Response:", response.data);
  
  const sendConfirmationEmail = async (email) => {
    try {
      const response = await axios.post("https://readify.railway.internal/api/payment/send-confirm-email", {
        email: formData.email
      });
  
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      toast.error(error.data.msg, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };
  sendConfirmationEmail();
  

  // Redirect after a short delay
  setTimeout(() => navigate("/paymentSuccess"), 3000);
} else {
  toast.error(result.error.message, {
    position: "top-right",
    autoClose: 5000,
    theme: "colored",
  });
}
} catch (error) {
toast.error("Payment failed. Please try again.", {
  position: "top-right",
  autoClose: 5000,
  theme: "colored",
});
console.error("Payment failed:", error);
}
  };

  const handleSendOtp = async () => {
    try {
      await sendOtp({ email: formData.email, totalPrice, orderDetails });
      alert("OTP sent to your email!");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  
  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp({ email, otp });
      if (response.data.message === "OTP verified successfully!") {
        alert("OTP Verified! Proceeding to Payment.");
        handleSubmitPayment();
      }
    } catch (error) {
      console.error("OTP Verification Failed:", error);
      alert("Invalid OTP!");
    }
  };

  return (
    <>
      <div className="checkout-container">
      <h2 className="checkoutHead">Checkout</h2>
        <div className="checkout-content">
          <div className="left-section">
            <h3 className="shipping">Shipping Address</h3>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="number"
                placeholder="Phone Number"
                value={formData.number}
                onChange={handleChange}
                required
              />
              <div className="input-group">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="CA">Cairo</option>
                  <option value="NY">Giza</option>
                </select>
              </div>

              {/* <div>
                <button type="button" onClick={handleSendOtp}>
                  Send OTP
                </button>

                <div className="input-group">
                  <label>Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                <button type="button" onClick={handleVerifyOtp}>
                  Verify OTP & Pay
                </button>

              </div> */}

              <h3 className="shipping">Payment Details</h3>

              <div className="input-group">
                <label>Card Number</label>
                <CardNumberElement className="card-input" />
              </div>

              <div className="input-group">
                <label>Expiry Date</label>
                <CardExpiryElement className="card-input" />
              </div>

              <div className="input-group">
                <label>CVV</label>
                <CardCvcElement className="card-input" />
              </div>

              <button type="submit" className="pay-btn" disabled={!stripe}>
                Place Order
              </button>
            </form>
          </div>
          <div className="order-summary">
            <p className="amount">Total Amount: <span className="content-det">{totalPrice} EGP</span></p>
            {/* <p className="order-details">Order details: <br /> <span className="content-det">{cartTitles}</span></p> */}
          </div>
        </div>
      </div>
    </>
  );
};

// Wrap CheckoutForm with Stripe Elements
const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm/>
  </Elements>
);

export default PaymentPage;
