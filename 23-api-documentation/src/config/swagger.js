import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notas API',
            version: '1.0.0',
            description: 'API para gestionar notas',
        },
        servers: [
            {
                url: 'http://localhost:3013',
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/models/*.js'], // Archivos donde se encuentran las anotaciones de Swagger
};

const specs = swaggerJsdoc(options);

const swaggerRouter = Router();
swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default swaggerRouter;