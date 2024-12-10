import { Router } from 'express';
import { body } from 'express-validator';
import { createNote, editNote, deleteNote, getNotes, importNotes, exportNotes } from '../controllers/notesController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const notesRouter = Router();

/**
 * @swagger
 * /notes/create:
 *   post:
 *     summary: Crear una nueva nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: Nota creada
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
notesRouter.post('/create', authenticateToken, [
    body('noteName').notEmpty().withMessage('El nombre de la nota es obligatorio'),
    body('content').notEmpty().withMessage('El contenido de la nota es obligatorio')
], createNote);

/**
 * @swagger
 * /notes/edit:
 *   put:
 *     summary: Editar una nota existente
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: Nota editada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Nota no encontrada
 *       500:
 *         description: Error del servidor
 */
notesRouter.put('/edit', authenticateToken, [
    body('noteName').notEmpty().withMessage('El nombre de la nota es obligatorio'),
    body('content').notEmpty().withMessage('El contenido de la nota es obligatorio')
], editNote);

/**
 * @swagger
 * /notes/delete:
 *   delete:
 *     summary: Eliminar una nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
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
 *         description: Nota eliminada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Nota no encontrada
 *       500:
 *         description: Error del servidor
 */
notesRouter.delete('/delete', authenticateToken, [
    body('noteName').notEmpty().withMessage('El nombre de la nota es obligatorio')
], deleteNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Obtener notas con paginación, filtrado y ordenación
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Campo por el cual ordenar (title, createdAt, updatedAt, size)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Orden (asc, desc)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filtro de búsqueda
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de resultados por página
 *     responses:
 *       200:
 *         description: Lista de notas
 *       500:
 *         description: Error del servidor
 */
notesRouter.get('/', authenticateToken, getNotes);

/**
 * @swagger
 * /notes/import:
 *   post:
 *     summary: Importar notas desde archivos .note
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
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
 *         description: Archivos importados exitosamente
 *       400:
 *         description: No se subieron archivos
 *       500:
 *         description: Error del servidor
 */
notesRouter.post('/import', authenticateToken, upload.array('files'), importNotes);

/**
 * @swagger
 * /notes/export:
 *   get:
 *     summary: Exportar notas a un archivo zip
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filtro de búsqueda
 *     responses:
 *       200:
 *         description: Archivo zip con las notas exportadas
 *       500:
 *         description: Error del servidor
 */
notesRouter.get('/export', authenticateToken, exportNotes);

export default notesRouter;