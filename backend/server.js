import express from "express";
import authRoutes from "./routes/auth.routes.js" //.js needed since we use modules
import userRoutes from "./routes/user.routes.js" 
import postRoutes from "./routes/post.routes.js" 
import notificationRoutes from "./routes/notification.routes.js" 
import dotenv from "dotenv";

import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //middleware
app.use(express.urlencoded({extended:true})); // to parse data (url encoded)

app.use(cookieParser());  //use this to parse the request and get cookie

app.use("/api/auth",authRoutes); //middleware to parse req.body
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/",(req,res)=>{
    res.send("server is ready");
});

app.listen(PORT,()=>{
    console.log('server runnning on port ${PORT} '+ PORT);
    connectMongoDB();
});