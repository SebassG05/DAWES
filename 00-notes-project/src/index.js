import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import notesRouter from './routes/notes.js';
import authRouter from './routes/auth.js';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3035;

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Notes API',
            version: '1.0.0',
            description: 'API for managing notes',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', authRouter);
app.use('/notes', notesRouter);

app.use(errorHandlingMiddleware);

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});