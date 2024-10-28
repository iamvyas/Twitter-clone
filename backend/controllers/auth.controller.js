import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import  generateTokenAndSetCookie  from '../lib/utils/generateToken.js';

export const signup =async (req,res) => {
    try{
        console.log("inside sign up");
        const {fullName,username , email , password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({error: "invalid email format"}); //400 denotes error code
        }

        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({error: "user already taken"});
        }

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({error: "email already taken"});
        }

        // password hashing

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password:hashedPassword
        })

        if(newUser){
            console.log("before token set");
            generateTokenAndSetCookie(newUser._id,res);
            console.log("after token set");
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                username: newUser.fullName,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg:newUser.profileImg,
                coverImg:newUser.coverImg,
            });
        }else{
            
            return res.status(400).json({error: "invalid user data"});
        }

    }catch(error){
        console.log("error in signup controller",error.message);
        return res.status(500).json({error: "internal server error"});
    }
}

export const login =async (req,res) => {
    try{
        console.log("inside login");
        const {username , password } = req.body;

        const existingUser = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser?.password || "");
        
        if(!existingUser || !isPasswordCorrect){
            console.log("invalid username or password");
            return res.status(400).json({error:"Invalid username or password"});
        }
        
        generateTokenAndSetCookie(existingUser._id,res);

        res.status(200).json({
            _id: existingUser._id,
                username: existingUser.fullName,
                email: existingUser.email,
                followers: existingUser.followers,
                following: existingUser.following,
                profileImg:existingUser.profileImg,
                coverImg:existingUser.coverImg,

        });
    }
    catch(error){
        console.log("error in login controller",error.message);
        return res.status(500).json({error: "internal server error"});
    }
}

export const logout =async (req,res) => {
    res.json({
        data:"you hit the logout endpoint",
    });
}