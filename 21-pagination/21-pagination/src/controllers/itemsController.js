import items from '../data/items';

const getItems = (req, res) => {
  let { sort, filter, page = 1, limit = 10 } = req.query;
  let result = [...items];

  // Filtrado
  if (filter) {
    result = result.filter(item => item.category === filter);
  }

  // Ordenación
  if (sort) {
    result.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  // Paginado
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  result = result.slice(startIndex, endIndex);

  res.json(result);
};

export default { getItems };