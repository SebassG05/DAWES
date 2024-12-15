import { Router } from 'express';
const router = Router();
import validateToken from '../middlewares/validateToken.js';
import checkRole from '../middlewares/checkrole.js';
import { publicRoute, vipRoute, adminRoute } from '../controllers/authController.js';

router.get('/public', publicRoute);
router.get('/vip', validateToken, vipRoute);
router.get('/admin', validateToken, checkRole('admin'), adminRoute);

export default router;