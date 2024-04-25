const express = require("express");
const { addUser, singinuser } = require("../controller/expensecontroller.js");

const route = express.Router();

route.post("/signup", addUser);
route.post("/login", singinuser);

module.exports = route;
