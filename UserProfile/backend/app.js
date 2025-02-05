import express from 'express';
import dotenv from 'dotenv';
import './connections/conn.js';
import userRoute from "./ModelsSchemas/users.js";
dotenv.config();
const app = express();
//routes
app.use(express.json());
app.use("/api/v1",userRoute);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} `);
});
