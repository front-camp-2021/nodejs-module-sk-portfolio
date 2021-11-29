const fs = require("fs");

const productsDb = "./homework-4/db/products.json";

const getAllProducts = (req, res) => {
  fs.readFile(productsDb, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let products = JSON.parse(data);
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
      products = products.filter((productFromDb) => productFromDb.id === id);
      const product = JSON.stringify(products);
      res.send(product);
    }
  });
};

module.exports = {
  getAllProducts,
  getProduct,
};
