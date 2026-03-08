import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    tags:{type:Array, default:[]},
    status:{type:String, enum:["Want to Read", "Reading", "Completed"]},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},

})

export default mongoose.model("book", bookSchema);