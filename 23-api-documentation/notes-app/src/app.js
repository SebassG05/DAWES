import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;