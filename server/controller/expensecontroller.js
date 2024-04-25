const Signup = require("../models/expense.js");
const { v4: uuidv4 } = require("uuid");

const addUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const data = await Signup.findOne({ where: { email: email } });
    console.log("Real Data: ", data);
    if (data) {
      return res.status(400).send("user already exists!");
    } else {
      const result = await Signup.create({
        name: name,
        email: email,
        password: password,
      });
      res.status(200).send(result);
    }
  } catch (err) {
    console.log("ADDING:  ", err);
    res.status(500).send("server error: ", err);
  }
};

const singinuser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const data = await Signup.findOne({ where: { email: email } });
    console.log("Real Data: ", data.password);
    if (!data) {
      return res.status(400).send("user doesn't exists!");
    }
    if (data.password !== req.body.password) {
      console.log(data.password, req.body.password);
      return res.status(400).send("wrong password");
    } else {
      const result = data;
      res.status(200).send(result);
    }
  } catch (err) {
    console.log("ADDING:  ", err);
    res.status(500).send("server error: ", err);
  }
};

module.exports = {
  addUser,
  singinuser,
};
