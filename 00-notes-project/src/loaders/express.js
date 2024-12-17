import express from 'express';
import { loggerMiddleware } from '../middlewares/loggerMiddleware.js';
import { errorHandlingMiddleware } from '../middlewares/errorHandlingMiddleware.js';
import notesRouter from '../routes/notes.js';

export default function (app) {
    app.use(loggerMiddleware);
    app.use(express.json());
    app.use('/notes', notesRouter);
    app.use(errorHandlingMiddleware);
}