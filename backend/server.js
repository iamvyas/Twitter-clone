import express from "express";
import authRoutes from "./routes/auth.routes.js" //.js needed since we use modules
import dotenv from "dotenv";

import connectMongoDB from './db/connectMongoDB.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //middleware
app.use(express.urlencoded({extended:true})); // to parse data (url encoded)

app.use("/api/auth",authRoutes); //middleware to parse req.body

app.get("/",(req,res)=>{
    res.send("server is ready");
});

app.listen(PORT,()=>{
    console.log('server runnning on port ${PORT} '+ PORT);
    connectMongoDB();
});