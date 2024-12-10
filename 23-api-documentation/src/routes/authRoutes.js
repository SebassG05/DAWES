import { Router } from 'express';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const authRouter = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticar administrador y obtener token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT
 *       403:
 *         description: Usuario no autorizado o contraseña incorrecta
 */
authRouter.post('/login', authenticateAdmin);

export default authRouter;