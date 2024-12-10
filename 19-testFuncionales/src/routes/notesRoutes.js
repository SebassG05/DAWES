import { Router } from 'express';
import { body } from 'express-validator';
import { createNote, editNote, deleteNote } from '../controllers/notesController.js';

const notesRouter = Router();

notesRouter.post('/create', [
    body('noteName').notEmpty().withMessage('El nombre de la nota es obligatorio'),
    body('content').notEmpty().withMessage('El contenido de la nota es obligatorio')
], createNote);

notesRouter.put('/edit', [
    body('noteName').notEmpty().withMessage('El nombre de la nota es obligatorio'),
    body('content').notEmpty().withMessage('El contenido de la nota es obligatorio')
], editNote);

notesRouter.delete('/delete', [
    body('noteName').notEmpty().withMessage('El nombre de la nota es obligatorio')
], deleteNote);

export default notesRouter;