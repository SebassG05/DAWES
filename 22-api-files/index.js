import express from 'express';
import dotenv from 'dotenv';
import fileRoutes from './src/routes/fileRoutes.js';
import loggerMiddleware from './src/middlewares/loggerMiddleware.js';
import errorHandlingMiddleware from './src/middlewares/errorHandlingMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(loggerMiddleware); // Usa el middleware de registro
app.use('/api', fileRoutes);

// Servir archivos estáticos desde la carpeta "files"
app.use('/files', express.static(path.join(__dirname, 'src/files')));

// Usa el middleware de manejo de errores
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});