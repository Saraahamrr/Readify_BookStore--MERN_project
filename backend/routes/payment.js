const express = require("express");
const Stripe = require("stripe");
const Order = require('../models/orders.js');
const dotenv = require("dotenv");
const {ConfirmationEmail} = require('../controllers/confirmationEmail.js');

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const{user,books,totalPrice,status} = req.body;

    // Create a PaymentIntent with the given amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: currency || "usd", // Use USD if EGP is not available
      payment_method_types: ["card"], // Supports card payments
    });

     //create a new order
            const newOrder = new Order({
              user : user,
              books   : books,
              totalPrice : totalPrice,
              status: status
            });
    
            //save the user
            await newOrder.save();

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error in payment:", error);
    res.status(500).send({ error: error.message });
  }
});

router.post("/send-confirm-email", ConfirmationEmail);
// in payment routes file

module.exports = router;
