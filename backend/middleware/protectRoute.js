import User from '../models/user.model.js';
import { getMe, login , logout , signup } from '../controllers/auth.controller.js';
import { decode } from 'jsonwebtoken';
import jwt from "jsonwebtoken";

export const protectRoute = async (req,res,next) => {
    try{
        //console.log("inside protect route check");
        //we are getting token from cookies
        const token = req.cookies.jwt; //we need to add another m/w cookieparser needed in server.js
        if(!token){
            return res.status(401).json({error:"Unauthorised: no token provided"});

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:"invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!User){
            return res.status(404).json({error:"user not found"});
        }

        req.user = user;
        next();
    }
    catch(error){
        console.log("error in protectedRoute mw "+ error.message);
        return res.status(500).json({error: "internal server error"});
        
    }
}