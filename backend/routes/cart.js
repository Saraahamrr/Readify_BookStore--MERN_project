const router = require('express').Router();
const User = require('../models/user.js');
const { authToken } = require('../middleWare/userAuth');

//put book to cart
const mongoose = require("mongoose");

router.put('/add-to-cart', authToken, async (req, res) => {

    try {
        const { bookid, id } = req.headers || req.query;

        // Validate id and bookid
        if (!id || !bookid) {
            return res.status(400).json({ message: "Missing id or bookid" });
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
            return res.json({ status: "Success", message: "Book is already in cart" });
        }

        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

        return res.json({ status: "success", message: "Book added to cart" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//remove from cart
router.put('/remove-from-cart/:bookid', authToken, async (req, res) => {
    try {
        const {bookid} = req.params;
        const {id} = req.headers;

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
        const userId = req.query.userId; // Get user ID from token or query
        if (!userId) return res.status(400).json({ message: "User ID required" });

        const userData = await User.findById(userId).populate('cart');
        if (!userData) return res.status(404).json({ message: "User not found" });

        return res.json({ status: 'success', data: userData.cart.reverse() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;