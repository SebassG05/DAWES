import { Router } from 'express';
import { exportNotes } from '../controllers/exportController.js';

const exportRouter = Router();

exportRouter.get('/export', exportNotes);

export default exportRouter;