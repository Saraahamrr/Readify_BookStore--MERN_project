import "./Checkout.css";
import { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    state: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    promoCode: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment Successful!");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="left-section">
          <h3>Shipping Address</h3>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            </div>
            <input type="text" name="address1" placeholder="Address 1 - Street, Building" value={formData.address1} onChange={handleChange} required />
            <input type="text" name="address2" placeholder="Address 2 - Apt, Floor" value={formData.address2} onChange={handleChange} />
            <div className="input-group">
              <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} required />
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
              <select name="state" value={formData.state} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="CA">Cairo</option>
                <option value="NY">Giza</option>
              </select>
            </div>
            
            <h3>Payment Details</h3>
            <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
            <div className="input-group">
              <input type="text" name="expiry" placeholder="Expiry Date (MM/YY)" value={formData.expiry} onChange={handleChange} required />
              <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />
            </div>
            
            <button type="submit" className="pay-btn">Place Order</button>
          </form>
        </div>

        <div className="right-section">
          <h3>Summary</h3>
          <div className="summary-details">
            <p>Subtotal: $300.00</p>
            <p>Shipping: FREE</p>
            <p>Total: <strong>$300.00</strong></p>
          </div>
          <div className="cart-items">
            <p>Cart (2 Items)</p>
            <p>Ghost 15 - $140.00</p>
            <p>Beast GTS 23 - $160.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
