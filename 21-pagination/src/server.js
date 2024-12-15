import express, { json } from 'express';
import itemsRoutes from './routes/items.js'; // Asegúrate de que la ruta es correcta
const app = express();
const PORT = 3000;

app.use(json());
app.use('/api', itemsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});