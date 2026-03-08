
import express  from 'express';
import { authMiddleware } from '../middleware/auth';
import { addBook } from '../controller/bookops';


const router = express.Router();

router.post('/addBook', authMiddleware, addBook);


export default router;