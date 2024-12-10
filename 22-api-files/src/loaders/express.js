import express from 'express';
import morgan from 'morgan';
import notesRouter from '../routes/notesRoutes.js';
import authRouter from '../routes/authRoutes.js';
import importRouter from '../routes/importRoutes.js';
import exportRouter from '../routes/exportRoutes.js';
import logger from '../utils/logger.js';
import { loggerMiddleware } from '../middlewares/loggerMiddleware.js';
import { errorHandlingMiddleware } from '../middlewares/errorHandlingMiddleware.js';

export default function (app) {
    app.use(morgan('combined', { stream: logger.stream }));
    app.use(loggerMiddleware);

    app.use(express.json());

    app.use('/notes', notesRouter);
    app.use('/auth', authRouter);
    app.use('/import', importRouter);
    app.use('/export', exportRouter);

    app.use(errorHandlingMiddleware);
}