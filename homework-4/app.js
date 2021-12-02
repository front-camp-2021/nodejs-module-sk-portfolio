const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();

const port = 5000;

const products = require("./routes/products");
const brands = require("./routes/brands");
const categories = require("./routes/categories");
const search = require("./routes/search");
const wishProducts = require("./routes/wish-products");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/products", products);
app.use("/brands", brands);
app.use("/categories", categories);
app.use("/search", search);
app.use("/wish-products", wishProducts);

app.listen(port, () => {});
