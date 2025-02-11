const mongoose = require('mongoose'); // Import mongoose
const { type } = require('os');

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
    phone: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://png.pngtree.com/png-vector/20231202/ourmid/pngtree-avatar-icon-personal-png-image_10852101.png'
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    status : {
        type: String,
        default: 'unauthorized',
        enum: ['authorized', 'unauthorized']
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpires: {
        type: Date,
        default: Date.now()
    },
    resetOTP: {
        type: String,
        default: ''
    },
    resetOTPExpires: {
        type: Date,
        default: Date.now()
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book'
        }
    ],
    cart: [
        {
            type: mongoose.Types.ObjectId, 
            ref: 'Book'
        }
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId, 
            ref: 'orders'
        }
    ],
    isSubscribed :{
        type: Boolean,
        default: false,
    },
    subscriptionExpiresAt: { type: Date, default: null } // New field for expiration
}, {
    timestamps: true
});

module.exports = mongoose.model('user', user); 