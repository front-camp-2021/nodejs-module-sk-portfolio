const express = require("express");
const router = express.Router();

const wishProductsController = require("../controlers/wish-products");

router.get("/", wishProductsController.getWishProducts);
router.delete("/", wishProductsController.clearWishProducts);
router.post("/:id", wishProductsController.postWishProduct);
router.delete("/:id", wishProductsController.deleteWishProduct);

module.exports = router;
