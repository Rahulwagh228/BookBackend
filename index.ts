import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';

import authRoutes from "./route/auth"
import { connectMongo } from './config/connectMongo';


dotenv.config();


const app = express();

app.use(cors());

app.use(express.json());
app.use('/auth/', authRoutes);

connectMongo();

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})

