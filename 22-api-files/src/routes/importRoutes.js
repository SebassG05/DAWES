import { Router } from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { importNotes } from '../controllers/importController.js';

const importRouter = Router();

importRouter.post('/import', upload.array('files'), importNotes);

export default importRouter;