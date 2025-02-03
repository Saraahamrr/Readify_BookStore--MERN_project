import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const conn = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database');
    }
    catch(err){
        console.log('this is an error consoledlog',err);
    }
}

conn();