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

app.get("/users", (req, res) => {
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let users = JSON.parse(data);
      res.send(users);
    }
  });
});

app.post("/users", (req, res) => {
  const { product } = req.body;
  const parseProduct = JSON.stringify(product);
  let usersPost;
  fs.readFile(db, json, (err, data) => {
    if (err) throw err;
    else {
      let users = JSON.parse(data);
      users.push({ ...product, id: uuid.v4() });
      usersPost = JSON.stringify(users);
    }
    fs.writeFile(db, usersPost, (err) => {
      if (err) throw err;
      res.send(parseProduct);
    });
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { product } = req.body;
  let usersPut;
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let users = JSON.parse(data);
      users = users.map((productFromDb) =>
        id === productFromDb.id ? { ...product, id: uuid.v4() } : productFromDb
      );
      console.log(users);
      usersPut = JSON.stringify(users);
      console.log(usersPut);
    }
    fs.writeFile(db, usersPut, (err) => {
      if (err) throw err;
      res.send(usersPut);
    });
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let users = JSON.parse(data);
      users = users.filter((product) => product.id === id);
      const user = JSON.stringify(...users);
      res.send(user);
    }
  });
});
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  let usersAfterDelete;
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let users = JSON.parse(data);
      users = users.filter((product) => product.id !== id);
      usersAfterDelete = JSON.stringify(users);
    }
    fs.writeFile(db, usersAfterDelete, (err) => {
      if (err) throw err;
      res.send(usersAfterDelete);
    });
  });
});
app.delete("/users/", (req, res) => {
  fs.readFile(db, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let users = JSON.parse(data);
      users = [];
      const usersAfterDelete = JSON.stringify(users);
      fs.writeFileSync(db, usersPut);
      res.send(usersAfterDelete);
    }
  });
});

app.listen(port, () => {});
