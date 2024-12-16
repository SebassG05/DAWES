import { Router } from 'express';
import { getBooks } from '../controllers/booksController.js'; // Corrige el nombre del archivo importado

const router = Router();

router.get('/books', getBooks);

export default router;