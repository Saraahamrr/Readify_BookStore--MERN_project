const mongoose = require("mongoose");
require("dotenv").config();

const conn = async () => {
    try{
        console.log("MongoDB URI:", process.env.URI);
        await mongoose.connect(`${process.env.URI}`)
        console.log("Connected to DB");
    }catch(err){
        console.log(err);
        
    }
};
module.exports = conn;
