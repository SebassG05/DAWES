import books from '../models/books.js';

const getBooks = (req, res) => {
  const { filter, sort, page = 1, limit = 10 } = req.query;
  let filteredBooks = books;

  // Filtrado
  if (filter) {
    filteredBooks = books.filter(book => book.genre.toLowerCase() === filter.toLowerCase());
  }

  // Ordenación
  if (sort) {
    const [key, order] = sort.split(':');
    filteredBooks.sort((a, b) => {
      if (a[key] < b[key]) return order === 'desc' ? 1 : -1;
      if (a[key] > b[key]) return order === 'desc' ? -1 : 1;
      return 0;
    });
  }

  // Paginado
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  res.json(paginatedBooks);
};

export { getBooks };
