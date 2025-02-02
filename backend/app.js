const express = require("express");
const connectDB = require("./config/conn");
require("dotenv").config();


const app = express();
connectDB();
app.use(express.json());
const bookRouter = require('./routes/books.route');
app.get("/test", (req, res) => {
    res.json({msg:"test worked"});
});
app.use('/api/books',bookRouter);
app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
});