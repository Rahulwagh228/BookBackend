
import express  from 'express';
import { authMiddleware } from '../middleware/auth';
import { addBook, allBooks, EditBooks, DeleteBooks } from '../controller/bookops';


const router = express.Router();

router.post('/addBook', authMiddleware, addBook);
router.get("/allBooks", authMiddleware, allBooks);
router.post("/editBook", authMiddleware, EditBooks);
router.delete("/deleteBook", authMiddleware, DeleteBooks);



export default router;