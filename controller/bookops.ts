import { Response } from 'express';
import Book from '../models/book';
import { AuthRequest } from '../types/AuthRequest';

export const addBook = async (req: AuthRequest, res: Response) => {
    
    console.log("add Book api hitt")
    try {
        const userId = req.userId;
        if (!userId) return res.status(401).json({ message: "User not authenticated" });

        const { title, author, tags, status } = req.body;
        if (!title || !author || !status) return res.status(400).json({ message: "missing required fields" });

        const book = await Book.create({ 
            title, 
            author, 
            tags, 
            status, 
            userId 
        });
        
        return res.status(200).json({ message: "Book Added Successfully", book });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in Adding Book" });
    }
}

export const allBooks = async (req: AuthRequest, res: Response) => {
    console.log("all Books api hitt")
    try {
        const userId = req.userId;
        console.log(userId, "useridddddddddddddddddd")
        if (!userId) return res.status(401).json({ message: "User not authenticated" });

        const books = await Book.find({ userId });
        const totalCount = await Book.countDocuments({ userId });

        return res.status(200).json({ 
            message: "Books fetched successfully", 
            totalCount, 
            books 
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in fetching books" });
    }
}