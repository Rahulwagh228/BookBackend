
import express  from 'express';
import { authMiddleware } from '../middleware/auth';
import { addBook, allBooks } from '../controller/bookops';


const router = express.Router();

router.post('/addBook', authMiddleware, addBook);
router.get("/allBooks", authMiddleware, allBooks);


export default router;