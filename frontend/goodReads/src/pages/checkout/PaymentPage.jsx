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
import { useNavigate } from "react-router-dom";

// Load Stripe
const stripePromise = loadStripe(
  "pk_test_51QpuysRruMS7ZCYMM6M3ZkuWggbceDGTOLzA9n1KOsu5CFt6kkp8Mr4yxd9UmIE4hXUEar5Wxshd2wDXJVMuU0EN003BCuwz0c"
);

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    state: "",
    promoCode: "",
  });

  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        alert("Payment Successful!");
        navigate("/paymentSuccess");
      } else {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Checkout</h2>
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
                name="address1"
                placeholder="Address 1 - City, Street"
                value={formData.address1}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address2"
                placeholder="Address 2 - Building, Apt, Floor"
                value={formData.address2}
                onChange={handleChange}
              />
              <div className="input-group">
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
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
        </div>
      </div>
    </>
  );
};

// Wrap CheckoutForm with Stripe Elements
const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentPage;
