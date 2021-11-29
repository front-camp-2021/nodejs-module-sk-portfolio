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
  let productsPost;
  fs.readFile(db, json, (err, data) => {
    if (err) throw err;
    else {
      let products = JSON.parse(data);
      products.push({ ...product, id: uuid.v4() });
      productsPost = JSON.stringify(products);
    }
    fs.writeFile(db, productsPost, (err) => {
      if (err) throw err;
      res.send(parseProduct);
    });
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
      products = products.filter((product) => product.id === id);
      const product = JSON.stringify(...products);
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
      products = products.filter((product) => product.id !== id);
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
      let products = JSON.parse(data);
      products = [];
      const productsAfterDelete = JSON.stringify(users);
      fs.writeFileSync(db, productsAfterDelete);
      res.send(productsAfterDelete);
    }
  });
});

app.listen(port, () => {});
