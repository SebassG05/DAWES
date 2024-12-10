import { Router } from 'express';
import { body } from 'express-validator';
import { createNote, editNote, deleteNote } from '../controllers/notesController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const notesRouter = Router();

notesRouter.post('/create', authenticateToken, [
    body('noteName').notEmpty().withMessage('El nombre de la nota es obligatorio'),
    body('content').notEmpty().withMessage('El contenido de la nota es obligatorio')
], createNote);

notesRouter.put('/edit', authenticateToken, [
    body('noteName').notEmpty().withMessage('El nombre de la nota es obligatorio'),
    body('content').notEmpty().withMessage('El contenido de la nota es obligatorio')
], editNote);

notesRouter.delete('/delete', authenticateToken, [
    body('noteName').notEmpty().withMessage('El nombre de la nota es obligatorio')
], deleteNote);

export default notesRouter;