const express = require("express");
const connectDB = require("./config/conn");
const cors = require('cors');
const userRouter = require("./routes/userControl");
const favouriteRouter = require("./routes/favourites");
const bookRouter = require('./routes/books.route');
require("dotenv").config();
const httpStatusText = require('./utils/httpStatusText')

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/books',bookRouter);
app.use ("/api", userRouter);
app.use ("/api", favouriteRouter);
app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
});

  