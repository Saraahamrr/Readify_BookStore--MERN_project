const express = require("express");
const connectDB = require("./config/conn");
const cors = require('cors');
require("dotenv").config();
const httpStatusText = require('./utils/httpStatusText')
const searchRouter = require("./routes/search")
const bookRouter = require('./routes/books.route');
const userRouter = require('./routes/userControl');
const favouriteRouter = require('./routes/favourites');
const authorRouter = require("./routes/authors.route");
const categoryRouter = require("./routes/categories.route");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/books',bookRouter);
app.use ("/api", userRouter);
app.use ("/api", favouriteRouter);
app.use("/api/authors", authorRouter);
app.use("/api/categories", categoryRouter);
app.use('/api/search',searchRouter);

// app.get("/test", (req, res) => {
//     res.json({msg:"test worked"});
// });


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

  