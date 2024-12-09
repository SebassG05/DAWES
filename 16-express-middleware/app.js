import express from 'express';
import morgan from 'morgan';
import logger from './logger.js';

const app = express();
const PORT = 3009;

// Middleware de Morgan para registrar accesos a la API
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Ruta para generar un error
app.get('/error', (req, res, next) => {
    const error = new Error('Error Occurred');
    next(error);
});

// Middleware de control de errores
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Server Error');
});

// Iniciar el servidor
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});