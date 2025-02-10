const router = require('express').Router();
const User = require('../models/user.js');
const { authToken } = require('../middleWare/userAuth.js');

//put book to cart
const mongoose = require("mongoose");

router.put('/add-to-cart', authToken, async (req, res) => {

    try {
        const {id} = req.body;
        const { bookid} = req.body;

        // Validate id and bookid
        if (!bookid) {
            return res.status(400).json({ message: "Missing bookid" });
        }

                // Validate id and bookid
                if (!id ) {
                    return res.status(400).json({ message: "Missing id" });
                }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            return res.json({ status: "success", message: "Book is already in cart" });
        }

        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

        return res.json({ status: "success", message: "Book added to cart" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//remove from cart
router.put('/remove-from-cart', authToken, async (req, res) => {
    try {
        const {id, bookid} = req.body;

        // Validate id and bookid
        if (!bookid) {
            return res.status(400).json({ message: "Missing bookid" });
        }

                // Validate id and bookid
                if (!id ) {
                    return res.status(400).json({ message: "Missing id" });
                }

        await User.findByIdAndUpdate(id, {
            $pull: {cart: bookid}
        });
        
        return res.json({
            status: "success",
            message: 'book removed from cart'
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: 'an error occurred'});
    }
});

//get cart of particular user
router.get('/get-user-cart', authToken, async (req, res) => {
    try {
        const id = req.body.id; // Get user ID from token or query
        if (!id) return res.status(400).json({ message: "User ID required" });

        const userData = await User.findById(id).populate('cart');
        if (!userData) return res.status(404).json({ message: "User not found" });

        return res.json({ status: 'success', data: userData.cart.reverse() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;