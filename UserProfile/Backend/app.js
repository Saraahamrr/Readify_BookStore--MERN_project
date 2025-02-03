// pkgs {init - y, express mongoose,dotenv, bcryptjs, nodemon,jsonwebtoken}

const express = require('express');
const app = express();
const userRouter = require("./routes/userControl");
const favouriteRouter = require("./routes/favourites");
require("./connections/conn.js");
require('dotenv').config();
app.use(express.json());

//routes
app.use ("/api/v1", userRouter);
app.use ("/api/v1", favouriteRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});