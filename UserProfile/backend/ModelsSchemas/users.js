import mongoose from 'mongoose';

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: 'https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png'
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
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
            type: mongoose.Types.ObjectId, // Corrected from moongoose
            ref: 'books'
        }
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId, // Corrected from moongoose
            ref: 'books'
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model('user', user, 'usercollection'); // 'users' is the collection name

export default User; // Export the model
