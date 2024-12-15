import { Router } from 'express';
import multer from 'multer';
import { createNote, editNote, deleteNote, getNotes, importNotes, exportNotes } from '../controllers/notes.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const upload = multer({ dest: 'uploads/' });
const notesRouter = Router();

notesRouter.use(authMiddleware); // Añadir esta línea para proteger las rutas

notesRouter.post('/create', async (req, res, next) => {
    try {
        createNote(req, res, next);
    } catch (error) {
        next(error);
    }
});

notesRouter.put('/edit', async (req, res, next) => {
    try {
        editNote(req, res, next);
    } catch (error) {
        next(error);
    }
});

notesRouter.delete('/delete', async (req, res, next) => {
    try {
        deleteNote(req, res, next);
    } catch (error) {
        next(error);
    }
});

notesRouter.get('/', async (req, res, next) => {
    try {
        getNotes(req, res, next);
    } catch (error) {
        next(error);
    }
});

notesRouter.post('/import', upload.array('files'), async (req, res, next) => {
    try {
        importNotes(req, res, next);
    } catch (error) {
        next(error);
    }
});

notesRouter.get('/export', async (req, res, next) => {
    try {
        exportNotes(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default notesRouter;
