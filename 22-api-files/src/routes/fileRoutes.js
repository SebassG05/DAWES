import { Router } from 'express';
import multer from 'multer';
import { uploadFile, downloadFile } from '../controllers/filesController.js';

const router = Router();
const upload = multer({ dest: 'src/files/' });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:name', downloadFile);

export default router;