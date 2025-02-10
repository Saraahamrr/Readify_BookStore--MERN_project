const router = require('express').Router();
const { authToken } = require('../middleWare/userAuth');
const Book = require('../models/book.js');
const Order = require('../models/orders.js');
const User = require('../models/user.js');

// Place order
router.post('/place-order', authToken, async (req, res) => {
    try {
        const { id } = req.body;
        const { order } = req.body;

        let totalPrice = 0;
        let bookIds = [];

        for (const orderItem of order) {
            const book = await Book.findById(orderItem._id);
            if (book) {
                totalPrice += book.price; // Sum up book prices
                bookIds.push(book._id);
            }
        }

        const newOrder = new Order({
            user: id,
            books: bookIds,
            totalPrice
        });

        const orderFromDB = await newOrder.save();

        // Save order in user model
        await User.findByIdAndUpdate(id, {
            $push: { orders: orderFromDB._id },
            $pull: { cart: { $in: bookIds } } // Clear cart items that are ordered
        });

        return res.json({
            status: 'success',
            message: 'Order placed successfully',
            order: orderFromDB
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

// Get order history of a user
router.get('/get-order-history', authToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: 'orders',
            populate: { path: 'books' }
        });

        const ordersData = userData.orders.reverse();

        return res.json({
            status: 'success',
            data: ordersData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

// Get all orders -- admin
router.get('/get-all-orders', authToken, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('books')
            .populate('user')
            .sort({ createdAt: -1 });

        return res.json({
            status: 'success',
            data: orders
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

// Update order status -- admin
router.put('/update-status/:id', authToken, async (req, res) => {
    try {
        const { id } = req.params;

        await Order.findByIdAndUpdate(id, { status: req.body.status });

        return res.json({
            status: 'success',
            message: 'Status updated successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
