import express from 'express';
import loaders from './src/loaders/index.js';

const app = express();

loaders.init(app);

export default app;