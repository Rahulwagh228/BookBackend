import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from 'cors';

import authRoutes from "./route/auth"
import bookRoutes from "./route/bookroute"
import { connectMongo } from './config/connectMongo';


const app = express();

app.use(cors());

app.use(express.json());
app.use('/auth/', authRoutes);
app.use("/api", bookRoutes)

connectMongo();

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})

