import { Router } from 'express';
import { getBooks } from '../controllers/booksController.js';

const router = Router();

router.get('/books', getBooks);

export default router;