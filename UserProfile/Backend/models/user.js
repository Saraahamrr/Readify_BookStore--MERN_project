const mongoose = require('mongoose'); // Import mongoose

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://media.gettyimages.com/id/2169722764/vector/simple-user-profile-icon-minimalist-black-and-white-avatar.jpg?s=612x612&w=gi&k=20&c=Kn6fxZ970khfBhewfmHUV_nNIM7jGTTOTgyaA91iU20='
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId, // Corrected from moongoose
            ref: 'books'
        }
    ],
    cart: [
        {
            type: mongoose.Types.ObjectId, 
            ref: 'books'
        }
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId, 
            ref: 'orders'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('user', user); 