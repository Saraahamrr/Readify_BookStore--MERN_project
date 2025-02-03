const express = require("express");
const connectDB = require("./config/conn");
const cors = require('cors');
require("dotenv").config();
const httpStatusText = require('./utils/httpStatusText')

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const bookRouter = require('./routes/books.route');

app.get("/test", (req, res) => {
    res.json({msg:"test worked"});
});
app.use('/api/books',bookRouter);

// global middle ware for not found router
app.all('*',(req,res,next)=>{
    res.status(404).json({ status: httpStatusText.ERROR, message: 'This resource is not available', code: 404 });
});

// global error handler
app.use((error,req,res,next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || httpStatusText.ERROR,
        message: error.message,
        code: error.statusCode || 500,
        data: null
    })
});
app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
});

  