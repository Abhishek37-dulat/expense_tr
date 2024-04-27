const Sequelize = require("sequelize");
const sequelize = require("../utils/database.js");

const Signup = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isPremium: Sequelize.BOOLEAN,
  total_cost: Sequelize.INTEGER,
});

module.exports = Signup;
