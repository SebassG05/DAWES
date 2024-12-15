import express from 'express';
import fileRoutes from './routes/fileRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use('/api', fileRoutes);

// Servir archivos estáticos desde la carpeta "files"
app.use('/files', express.static(path.join(__dirname, 'files')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});