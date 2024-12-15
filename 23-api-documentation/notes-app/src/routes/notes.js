import { Router } from 'express';
import multer from 'multer';
import { createNote, editNote, deleteNote, getNotes, importNotes, exportNotes } from '../controllers/notes.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const upload = multer({ dest: 'uploads/' });
const notesRouter = Router();

notesRouter.use(authMiddleware); // Añadir esta línea para proteger las rutas

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes management
 */

/**
 * @swagger
 * /notes/create:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noteName:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 *       400:
 *         description: Bad request
 */
notesRouter.post('/create', async (req, res, next) => {
    try {
        createNote(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /notes/edit:
 *   put:
 *     summary: Edit an existing note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noteName:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note edited
 *       400:
 *         description: Bad request
 *       404:
 *         description: Note not found
 */
notesRouter.put('/edit', async (req, res, next) => {
    try {
        editNote(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /notes/delete:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noteName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note deleted
 *       400:
 *         description: Bad request
 *       404:
 *         description: Note not found
 */
notesRouter.delete('/delete', async (req, res, next) => {
    try {
        deleteNote(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of notes per page
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       noteName:
 *                         type: string
 *                       content:
 *                         type: string
 *                       category:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */
notesRouter.get('/', async (req, res, next) => {
    try {
        getNotes(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /notes/import:
 *   post:
 *     summary: Import notes
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Notes imported
 *       400:
 *         description: No files uploaded
 */
notesRouter.post('/import', upload.array('files'), async (req, res, next) => {
    try {
        importNotes(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /notes/export:
 *   get:
 *     summary: Export notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Notes exported
 *       500:
 *         description: Error exporting notes
 */
notesRouter.get('/export', async (req, res, next) => {
    try {
        exportNotes(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default notesRouter;