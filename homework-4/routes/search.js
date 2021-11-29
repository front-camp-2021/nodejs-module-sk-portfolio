const express = require("express");
const router = express.Router();

const searchController = require("../controlers/search");

router.get("/", searchController.getFilteredProduts);

module.exports = router;
