import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware.js';
import dotenv from 'dotenv';

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