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
app.get("/test", (req, res) => {
    res.json({msg:"test worked"});
});
app.use('/api/books',bookRouter);
app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
});