const router = require('express').Router();
const User = require('../models/user.js');
const { authToken } = require('./userAuth');

//put book to cart
router.put('/add-to-cart', authToken, async (req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);

        if(isBookInCart){
            return res.json({
                status: "Success",
                message: "book is already in cart"
            });
        }

        await User.findByIdAndUpdate(id, {
            $push: {cart: bookid}
        });

        return res.json({
            status: "success",
            message: 'book added to cart'
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: 'an error occurred'});
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
        const userData = await User.findById(req.user.id).populate('cart'); // Using req.user.id
        const cart = userData.cart.reverse();

        return res.json({
            status: 'success',
            data: cart
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;