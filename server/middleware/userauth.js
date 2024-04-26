const jwt = require("jsonwebtoken");
const User = require("../models/expense.js");

const auth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization");
    const user = jwt.verify(token, "secretkey");
    const userdata = await User.findByPk(user.id);
    req.user = userdata;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "user not authorized!", error });
  }
};

module.exports = auth;
