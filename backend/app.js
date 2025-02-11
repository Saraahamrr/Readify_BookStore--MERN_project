const express = require("express");
const app = express();
const connectDB = require("./config/conn");
const cors = require('cors');
const paymentRoutes = require("./routes/payment.js");

require("dotenv").config();

const httpStatusText = require('./utils/httpStatusText');
const searchRouter = require("./routes/search");
const bookRouter = require('./routes/books.route');
const userRouter = require('./routes/userControl');
const favouriteRouter = require('./routes/favourites');
const authorRouter = require("./routes/authors.route");
const categoryRouter = require("./routes/categories.route");
const cookieParser = require('cookie-parser');


// Import cart earlier to avoid circular dependency issues
const Cart = require('./routes/cart.js');
const Order = require('./routes/order.js');
const otpRoutes = require("./routes/otp");

connectDB();
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests from frontend
      credentials: true, // Allow sending cookies
    })
  );

app.use(express.json());


// Routes
app.use('/api/books', bookRouter);
app.use ("/api", userRouter);
app.use ("/api", favouriteRouter);

app.use('/api/cart', Cart); 
app.use('/api/order', Order);
app.use("/api/payment", paymentRoutes);
app.use("/api/otp", otpRoutes);

const { cookie } = require("express-validator");
app.get("/test", (req, res) => {
    res.json({msg:"test worked"});
});

app.use("/api/authors", authorRouter);
app.use("/api/categories", categoryRouter);
app.use('/api/search', searchRouter);

// global middle ware for not found router
app.all('*',(req,res,next)=>{
    res.status(404).json({ status: httpStatusText.ERROR, message: 'This resource is not available', code: 404 });
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

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
