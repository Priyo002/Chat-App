import express from 'express';
import userRoute from "./routes/user.js"
import { connectDB } from './utils/features.js';


const app = express();

connectDB("mongodb://localhost:27017/Chattapp");

app.use("/user",userRoute);

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})