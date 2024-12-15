import { Router } from 'express';
import { listUsers, getUser, addUser, modifyUser, removeUser } from '../controllers/users.js';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/:id', modifyUser);
router.delete('/:id', removeUser);

export default router;