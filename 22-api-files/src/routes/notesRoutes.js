import { Router } from 'express';
import { body } from 'express-validator';
import { createNote, editNote, deleteNote, getNotes, importNotes, exportNotes } from '../controllers/notesController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

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

notesRouter.get('/', authenticateToken, getNotes);

notesRouter.post('/import', authenticateToken, upload.array('files'), importNotes);
notesRouter.get('/export', authenticateToken, exportNotes);

export default notesRouter;