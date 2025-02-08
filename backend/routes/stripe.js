const router = require('express').Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/create-checkout-session", async(req, res)=>{
    const {products} = req.body;
    const lineItems = products.map((product) =>({
        price_data:{
            currency: 'EGP',
            product_data: {
                name: product.name,
                imgs: [product.image]
            },
            unit_amount: product.price * 100, // Stripe expects amount in cents (multiply by 100)
        },
        quantity: product.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel'
    });

    res.json({
        id: session.id
    });
});

module.exports = router;