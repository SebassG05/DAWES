import books from '../models/books.js';

const getBooks = (req, res) => {
  let { sort, filter, page = 1, limit = 10 } = req.query;
  let result = [...books];

  // Filtrado
  if (filter) {
    result = result.filter(book => book.genre.toLowerCase() === filter.toLowerCase());
  }

  // Ordenación
  if (sort) {
    result.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  // Paginado
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  result = result.slice(startIndex, endIndex);

  res.json(result);
};

export { getBooks };