const express = require("express");
const app = express();
const connectDB = require("./config/conn");
const cors = require('cors');
require("dotenv").config();

const httpStatusText = require('./utils/httpStatusText');
const searchRouter = require("./routes/search");
const bookRouter = require('./routes/books.route');
const userRouter = require('./routes/userControl');
const favouriteRouter = require('./routes/favourites');

// Import cart earlier to avoid circular dependency issues
const Cart = require('./routes/cart.js');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/books', bookRouter);
app.use ("/api", userRouter);
app.use ("/api", favouriteRouter);
app.use('/api/cart', Cart); // Ensure Cart is correctly required

const authorRouter = require("./routes/authors.route");
const categoryRouter = require("./routes/categories.route");

app.get("/test", (req, res) => {
    res.json({msg:"test worked"});
});
app.use("/api/authors", authorRouter);
app.use("/api/categories", categoryRouter);
app.use('/api/search', searchRouter);

// Global middleware for handling not found routes
app.all('*', (req, res, next) => {
    res.status(404).json({ 
        status: httpStatusText.ERROR, 
        message: 'This resource is not available', 
        code: 404 
    });
});

// Global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || httpStatusText.ERROR,
        message: error.message,
        code: error.statusCode || 500,
        data: null
    });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
