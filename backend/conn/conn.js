const mongoose = require("mongoose");
import { process } from '../node_modules/ipaddr.js/lib/ipaddr.js.d';
const conn = async () => {
    try{
        await mongoose.connect(`${process.env.URI}`)
        console.log("Connected to DB");
    }catch(err){
        console.log(err);
        
    }
};
conn();