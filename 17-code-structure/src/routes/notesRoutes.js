import { Router } from 'express';
import { createNote, editNote, deleteNote } from '../controllers/notesController.js';

const notesRouter = Router();

notesRouter.post('/create', createNote);
notesRouter.put('/edit', editNote);
notesRouter.delete('/delete', deleteNote);

export default notesRouter;