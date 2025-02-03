import moongoose from 'mongoose';
//const mongoose = require('mongoose');
const orders = new mongoose.Schema({
    user: {
        type: moongoose.types.objectId,
        ref: 'users'
    },
    books: [
        {
            type : moongoose.types.objectId,
            ref: 'books'
        }
    ],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'order placed',
        enum : ['order placed', 'completed', 'out for delivery, delivered' , 'delivered']
    }
},
{
    timestamps: true
});
module.exports = mongoose.model('orders', orders); // orders is the collection name
