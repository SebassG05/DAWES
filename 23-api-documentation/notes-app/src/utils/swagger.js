import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notas API',
            version: '1.0.0',
            description: 'Documentación de la API de Notas',
        },
    },
    apis: ['./src/routes/*.js', './src/models/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerRouter = Router();
swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerRouter;