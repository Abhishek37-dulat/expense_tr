const Sequelize = require("sequelize");

const sequelize = new Sequelize("newdatastorage", "root", "funtolaughAD@123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
