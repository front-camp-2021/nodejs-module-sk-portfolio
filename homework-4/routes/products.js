const express = require("express");
const router = express.Router();

const productsController = require("../controlers/products");

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProduct);

module.exports = router;
