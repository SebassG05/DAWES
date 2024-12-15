import express from 'express';
import detect from 'detect-port';
import config from './config.js';
import notesRouter from './routes/notes.js';
import swaggerRouter from './swagger.js';
import authRouter from './routes/auth.js';
import logger from './utils/logger.js';

const app = express();
app.use(express.json());
app.use('/notes', notesRouter);
app.use('/', swaggerRouter);
app.use('/', authRouter); // Añadir esta línea para integrar la ruta de autenticación

const DEFAULT_PORT = config.app.PORT;

detect(DEFAULT_PORT, (err, availablePort) => {
    if (err) {
        logger.error(`Error detecting port: ${err.message}`);
        process.exit(1);
    }

    const PORT = availablePort === DEFAULT_PORT ? DEFAULT_PORT : availablePort;
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
        console.log(`Server running on port ${PORT}`);
    }).on('error', (err) => {
        logger.error(`Error starting server: ${err.message}`);
        process.exit(1);
    });
});