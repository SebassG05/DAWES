import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './src/routes/booksRoutes.js';
import loggerMiddleware from './src/middlewares/loggerMiddleware.js';
import errorHandlingMiddleware from './src/middlewares/errorHandlingMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware); // Usa el middleware de registro
app.use('/api', bookRoutes);

// Usa el middleware de manejo de errores
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});