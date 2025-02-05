const router = require('express').Router();
const {authenticateToken} = require('./userAuth');
const Book = require('../models/book.js');
const Order = require('../models/orders.js');

//place order
router.post('/place-order', authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const {order} = req.body;

        for(const orderDate of order){
            const newOrder = new Order({user: id, book: orderDate._id});
            const orderDateFromDB = await newOrder.save();

            //save order in user model
            await User.findByIdAndUpdate(id, {
                $push: {orders: orderDateFromDB._id}
            });

            //clear cart
            await User.findByIdAndUpdate(id, {
                $pull: {cart: orderDate._id}
            });
        }

        return res.json({
            status: 'success',
            message: 'order placed successfully'
        });
        
    } catch (error){
        console.log(error);
        return res.status(500).json({message: 'an error occurred'});
    }
});

module.exports = router;