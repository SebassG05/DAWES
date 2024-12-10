import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './notas');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (path.extname(file.originalname) === '.note') {
        cb(null, true);
    } else {
        cb(new Error('Only .note files are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;