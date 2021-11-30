const paginationResult = (model, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = {};
  if (startIndex < model.length) {
    result.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    result.prev = {
      page: page - 1,
      limit: limit,
    };
  }
  result.result = model.slice(startIndex, endIndex);
  return result;
};

module.exports = { paginationResult };
