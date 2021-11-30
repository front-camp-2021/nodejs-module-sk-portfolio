const fs = require("fs");

const productsDb = "./homework-4/db/products.json";

const paginationServices = require("../services/pagination");

const getFilteredProduts = (req, res) => {
  const { page, limit } = req.query;
  const query = req.query.q;
  const brand = req.query.brand;
  const category = req.query.category;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const minRating = req.query.minRating;
  const maxRating = req.query.maxRating;
  let products;
  fs.readFile(productsDb, "utf8", (err, data) => {
    if (err) throw err;
    else {
      products = JSON.parse(data);
      let filteredProducts = products.filter((product) => {
        const isQuery = query ? product.title.includes(query) : true;
        const isBrand = brand ? product.brand === brand : true;
        const isCategory = category ? product.category === category : true;
        const isInPriceRange =
          minPrice && maxPrice
            ? product.price <= +maxPrice && product.price >= +minPrice
            : true;
        const isInRatingRange =
          minRating && maxRating
            ? product.rating <= +maxRating && product.rating >= +minRating
            : true;

        if (
          isQuery &&
          isBrand &&
          isCategory &&
          isInPriceRange &&
          isInRatingRange
        ) {
          return product;
        }
      });
      paginationProducts = paginationServices.paginationResult(
        filteredProducts,
        page,
        limit
      );
      products = page && limit ? paginationProducts : filteredProducts;
      filteredProducts = JSON.stringify(products);
      res.send(filteredProducts);
    }
  });
};

module.exports = {
  getFilteredProduts,
};
