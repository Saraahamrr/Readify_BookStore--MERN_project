const express = require("express");
const connectDB = require("./config/conn");
const userRouter = require("./routes/userControl");
const favouriteRouter = require("./routes/favourites");
const bookRouter = require('./routes/books.route');
require("dotenv").config();


const app = express();
connectDB();
app.use(express.json());

app.use('/api/books',bookRouter);
app.use ("/api/v1", userRouter);
app.use ("/api/v1", favouriteRouter);

app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
});