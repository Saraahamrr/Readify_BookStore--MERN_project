import "./Checkout.css";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPayment, sendOtp, verifyOtp } from "../../services/api";
import "./PaymentPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// Load Stripe
const stripePromise = loadStripe(
  "pk_test_51QpuysRruMS7ZCYMM6M3ZkuWggbceDGTOLzA9n1KOsu5CFt6kkp8Mr4yxd9UmIE4hXUEar5Wxshd2wDXJVMuU0EN003BCuwz0c"
);

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [otp, setOtp] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Define the subscription price
  const totalPrice = 300; // Subscription price is fixed at $300

  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendConfirmationEmail = async (email) => {
    try {
      const response = await axios.post(
        "https://readify.railway.internal/api/payment/send-confirm-email",
        {
          email,
        }
      );

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
      toast.error(error.response?.data?.msg || "Failed to send email", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      console.error("CardNumberElement not found.");
      return;
    }

    try {
      const { data } = await createPayment({ amount: totalPrice, currency: "usd" });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });

      if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
        toast.success("Payment Successful!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        const userId = localStorage.getItem("userId");

        try {
          const response = await axios.post("https://readify.railway.internal/api/order/subscribe", {
            userId,
          });

          console.log("Order Response:", response.data);
          localStorage.setItem("isSubscribed", "true");

          if (formData.email) {
            sendConfirmationEmail(formData.email);
          }

          setTimeout(() => navigate("/subscription-success"), 3000);
        } catch (error) {
          console.error("Subscription error:", error);
        }
      } else {
        toast.error(result.error?.message || "Payment failed!", {
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
      const response = await verifyOtp({ email: formData.email, otp });
      if (response.data.message === "OTP verified successfully!") {
        alert("OTP Verified! Proceeding to Payment.");
        handleSubmit();
      }
    } catch (error) {
      console.error("OTP Verification Failed:", error);
      alert("Invalid OTP!");
    }
  };

  return (
    <>
      <div className="checkout-container">
        <h2 className="checkoutHead">Subscription</h2>
        <div className="checkout-content">
          <div className="left-section">
            <div className="sub">
              Subscription Price: $300 <br />
              <span>Subscription is for 1 Year</span>
            </div>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <h3 className="shipping">Payment Details</h3>

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
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// Wrap CheckoutForm with Stripe Elements
const Subscription = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Subscription;

