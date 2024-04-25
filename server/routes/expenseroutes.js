const express = require("express");
const { addUser } = require("../controller/expensecontroller.js");

const route = express.Router();

route.post("/", addUser);

module.exports = route;
