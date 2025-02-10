const express = require("express");
const Stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Create a PaymentIntent with the given amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: currency || "usd", // Use USD if EGP is not available
      payment_method_types: ["card"], // Supports card payments
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error in payment:", error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
