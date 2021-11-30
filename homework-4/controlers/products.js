const fs = require("fs");

const productsDb = "./homework-4/db/products.json";

const paginationServices = require("../services/pagination");

const getAllProducts = (req, res) => {
  let { page, limit } = req.query;
  fs.readFile(productsDb, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let products = JSON.parse(data);
      paginationProducts = paginationServices.paginationResult(
        products,
        page,
        limit
      );
      products = page && limit ? paginationProducts : products;
      products = JSON.stringify(products);
      res.send(products);
    }
  });
};

const getProduct = (req, res) => {
  const { id } = req.params;
  fs.readFile(productsDb, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let products = JSON.parse(data);
      let product = products.find((product) => product.id === id);
      product = JSON.stringify(product);
      res.send(product);
    }
  });
};

module.exports = {
  getAllProducts,
  getProduct,
};
