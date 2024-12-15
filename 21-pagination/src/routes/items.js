import { Router } from 'express';
import { getItems } from '../controllers/itemsController.js';
const router = Router();

router.get('/items', getItems);

export default router;