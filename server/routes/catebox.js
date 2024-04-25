const {
  addexpense,
  deleteexpense,
  getAllExpense,
} = require("../controller/bookcontroller.js");
const express = require("express");

const route = express.Router();

route.get("/all", getAllExpense);
route.post("/add", addexpense);
route.delete("/delete/:id", deleteexpense);

module.exports = route;
