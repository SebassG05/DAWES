import express from 'express';
import routes from '../routes/index.js';

const expressLoader = (app) => {
  app.use(express.json());
  app.use('/api', routes);
};

export default expressLoader;