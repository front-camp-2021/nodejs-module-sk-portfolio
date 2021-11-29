const fs = require("fs");

const brandsDb = "./homework-4/db/brands.json";

const getAllBrands = (req, res) => {
  fs.readFile(brandsDb, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let brands = JSON.parse(data);
      brands = JSON.stringify(brands);
      res.send(brands);
    }
  });
};

module.exports = {
  getAllBrands,
};
