import express from 'express';
import initLoaders from './loaders/index.js';

const app = express();

initLoaders(app);

export default app;