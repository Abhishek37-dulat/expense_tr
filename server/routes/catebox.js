const {
  addexpense,
  deleteexpense,
  getAllExpense,
} = require("../controller/bookcontroller.js");
const express = require("express");
const auth = require("../middleware/userauth.js");

const route = express.Router();

route.get("/all", auth, getAllExpense);
route.post("/add", auth, addexpense);
route.delete("/delete/:id", auth, deleteexpense);

module.exports = route;
