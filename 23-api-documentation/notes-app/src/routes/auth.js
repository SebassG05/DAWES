import { Router } from 'express';
import { login } from '../controllers/auth.js';

const authRouter = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión y obtiene un token
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
 *         description: Token generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 */
authRouter.post('/login', login);

export default authRouter;
