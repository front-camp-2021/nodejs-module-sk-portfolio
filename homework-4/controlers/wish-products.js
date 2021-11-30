const fs = require("fs");

const productsDb = "./homework-4/db/products.json";

const paginationServices = require("../services/pagination");

const getWishProducts = (req, res) => {
  const { page, limit } = req.query;
  fs.readFile(productsDb, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let products = JSON.parse(data);
      products = products.filter(({ isWished }) => isWished === true);
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
const postWishProduct = (req, res) => {
  const { id } = req.params;
  let products;
  fs.readFile(productsDb, "utf8", (err, data) => {
    if (err) throw err;
    else {
      products = JSON.parse(data);
      products = products.map((productFromDb) =>
        productFromDb.id === id
          ? { ...productFromDb, isWished: true }
          : productFromDb
      );
      products = JSON.stringify(products);
    }
    fs.writeFile(productsDb, products, (err) => {
      if (err) throw err;
      else {
        res.send(products);
      }
    });
  });
};

const deleteWishProduct = (req, res) => {
  const { id } = req.params;
  let products;
  fs.readFile(productsDb, "utf8", (err, data) => {
    if (err) throw err;
    else {
      products = JSON.parse(data);
      products = products.map((productFromDb) => {
        return productFromDb.id === id
          ? { ...productFromDb, isWished: false }
          : productFromDb;
      });
      products = JSON.stringify(products);
    }
    fs.writeFile(productsDb, products, (err) => {
      if (err) throw err;
      else {
        res.send(products);
      }
    });
  });
};

module.exports = {
  deleteWishProduct,
  postWishProduct,
  getWishProducts,
};