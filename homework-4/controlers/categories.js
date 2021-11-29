const fs = require("fs");

const categoriesDb = "./homework-4/db/categories.json";

const getAllCategories = (req, res) => {
  fs.readFile(categoriesDb, "utf8", (err, data) => {
    if (err) throw err;
    else {
      let categories = JSON.parse(data);
      categories = JSON.stringify(categories);
      res.send(categories);
    }
  });
};

module.exports = {
  getAllCategories,
};
