const mongoose = require('mongoose');

const orders = new mongoose.Schema({
    user: {
        type: moongoose.types.objectId,
        ref: 'user'
    },
    books: [
        {
            type : moongoose.types.objectId,
            ref: 'books'
        }
    ],
    status: {
        type: String,
        default: 'order placed',
        enum : ['order placed', 'completed', 'out for delivery, delivered' , 'delivered']
    }
},
{
    timestamps: true
});
module.exports = mongoose.model('orders', orders);
