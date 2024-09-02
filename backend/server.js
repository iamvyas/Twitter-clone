import express from "express";
import authRoutes from "./routes/auth.routes.js" //.js needed since we use modules

const app = express();

app.use("/api/auth",authRoutes); //middleware

app.get("/",(req,res)=>{
    res.send("server is ready");
});

app.listen(8000,()=>{
    console.log("server runnning");
});