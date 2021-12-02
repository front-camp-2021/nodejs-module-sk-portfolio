const express = require("express");
const router = express.Router();

const brandsController = require("../controlers/brands");

router.get("/", brandsController.getAllBrands);

module.exports = router;
