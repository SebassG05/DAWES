import { Router } from 'express';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post('/login', authenticateAdmin);

export default authRouter;