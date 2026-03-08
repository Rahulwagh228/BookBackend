import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config();


let isconnected = false;

export const connectMongo = async () => {
    try{
        if(isconnected) return mongoose;
  
    const mongoUri = process.env.MONGO_URI;

    if(!mongoUri){
        console.error("Uri DAal")
        return null;
    }
    await mongoose.connect(mongoUri);
    console.log("MongoDb Connected")
    isconnected = true;
    return mongoose;


} catch(err){
    console.log("Mongo onnection Error", err);
    return null;
}  }