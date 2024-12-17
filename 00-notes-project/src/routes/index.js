import { Router } from 'express';
import notesRouter from './notes.js';
import { login } from '../controllers/auth.js';

const router = Router();

router.post('/login', login);
router.use('/notes', notesRouter);

export default router;