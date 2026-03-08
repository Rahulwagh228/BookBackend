import express from 'express';
// import * as express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from '../models/user'

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "KAREGA";


router.post("/register", async(req:express.Request, res: express.Response)=>{
    console.log("register api hitt");
    try{
        const{username, email, password} = req.body;
        if(!username || !email || !password) return res.status(400).json({message:"All fields are required"});

        const is_user_present = await User.findOne({email});
        if(is_user_present) return res.status(400).json({message:"User Already Exits"});

        const passhashed = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, password:passhashed});
        const token = jwt.sign({id:user.id}, JWT_SECRET, {expiresIn:"10d"})
        const response = {
            id : user.id,
            username:user.username, 
            email:user.email,
            token
        }
        return res.status(200).json({message:"User Registered Successfully", response})

    }
    catch(err){
        throw new Error("Error in Registering User");
    }
})


router.post("/login", async(req:express.Request, res: express.Response)=>{
    console.log("login api hitt")
    try{
        const{email, password} = req.body;
        if(!email || !password) return res.status(400).json({message:"All fields are required"});

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"User Not Found"});

        const is_password_correct = await bcrypt.compare(password, user.password);
        if(!is_password_correct) return res.status(400).json({message:"Invalid Password"});

        const token = jwt.sign({id:user.id}, JWT_SECRET, {expiresIn:"10d"});
         const response = {
            id : user.id,
            username:user.username, 
            email:user.email,
            token
        }
        return res.status(200).json({message:"User Logged In", response});

    }
    catch(err){
        throw new Error("Error in Logging In User");
    }
})

export default router;