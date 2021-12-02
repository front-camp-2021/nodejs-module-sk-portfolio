const paginationResult = (model, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = {};

  result.numberOfProducts = model.length;
  result.products = model.slice(startIndex, endIndex);

  return result;
};

module.exports = { paginationResult };
