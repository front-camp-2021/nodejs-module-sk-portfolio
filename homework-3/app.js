const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const app = express();

const fs = require("fs");
const { json } = require("express");

const port = 5000;

const db = "./homework-3/db.json";

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/products", (req, res) => {
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let products = JSON.parse(data);
      res.send(products);
    }
  });
});

app.post("/products", (req, res) => {
  const { product } = req.body;
  const parseProduct = JSON.stringify(product);
  fs.readFile(db, json, (err, data) => {
    if (err) throw err;
    else {
      let products = JSON.parse(data);
      products.push({ ...product, id: uuid.v4() });
      fs.writeFile(db, JSON.stringify(products), (err) => {
        if (err) throw err;
        res.send(parseProduct);
      });
    }
  });
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { product } = req.body;
  let productsPut;
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let products = JSON.parse(data);
      products = products.map((productFromDb) =>
        id === productFromDb.id ? { ...product, id: uuid.v4() } : productFromDb
      );
      productsPut = JSON.stringify(products);
    }
    fs.writeFile(db, productsPut, (err) => {
      if (err) throw err;
      res.send(productsPut);
    });
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let products = JSON.parse(data);
      let product = products.find((product) => product.id === id);
      product = JSON.stringify(product);
      res.send(product);
    }
  });
});
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  let productsAfterDelete;
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let products = JSON.parse(data);
      const productIndex = products.findIndex((product) => product.id === id);
      products.splice(productIndex, 1);
      productsAfterDelete = JSON.stringify(products);
    }
    fs.writeFile(db, productsAfterDelete, (err) => {
      if (err) throw err;
      res.send(productsAfterDelete);
    });
  });
});
app.delete("/products/", (req, res) => {
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    else {
      const products = [];
      const productsAfterDelete = JSON.stringify(products);
      fs.writeFileSync(db, productsAfterDelete);
      res.status(204).json({ status: "ok" });
    }
  });
});

app.listen(port, () => {});
