import express from 'express';
import routes from './src/routes/index.js'; // Correct the import path

const app = express();

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});