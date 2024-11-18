import express from 'express';
import morgan from 'morgan';
import logger from './logger.js';  

const app = express();
const PORT = 3009;


app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));


app.get('/', (req, res, next) => {
    res.send('Hello World');
});

app.get('/error', (req, res, next) => {
    const error = new Error('Error Occurred');
    next(error);
});


app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Server Error');
});


app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
