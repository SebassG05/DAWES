import express from 'express';

const app = express();
const port = 3000;


const items = [
  { id: 1, name: 'Nota 1' },
  { id: 2, name: 'Libro' },
  { id: 3, name: 'Usuario' },
];


app.get('/items', (req, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});