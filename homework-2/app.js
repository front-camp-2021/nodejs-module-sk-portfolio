const express = require("express");

const app = express();

const fs = require("fs");

const port = 5000;

app.get("/", (req, res) => {
  res.send("Greeting from server!");
});

app.get("/data", (req, res) => {
  res.send("Welcome to data path");
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

const numbersFile = "./homework-2/text/numbers.txt";

const fileForReadAndDelete = "./homework-2/text/file-for-read-and-delete.txt";

let numbers = "";
for (let i = 1; i <= 10; i++) {
  numbers = numbers + `${i}\n`;
}

fs.writeFile(numbersFile, numbers, (err) => {
  if (err) throw err;
  console.log(`${numbersFile} was written`);
});

fs.readFile(fileForReadAndDelete, "utf8", (err, data) => {
  if (err)
    console.log(`file '${fileForReadAndDelete}' not founded for reading`);
  else console.log(`${data}`);
});
fs.unlink(fileForReadAndDelete, (err) => {
  if (err)
    console.log(`file '${fileForReadAndDelete}' not founded for removing`);
  else console.log(`'${fileForReadAndDelete}' was removed`);
});
