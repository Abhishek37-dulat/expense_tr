const Signup = require("../models/expense.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const addUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const data = await Signup.findOne({ where: { email: email } });

    if (data) {
      return res.status(400).json({ message: "user already exists!" });
    } else {
      const salt = 10;
      bcrypt.hash(password, salt, async (err, result) => {
        if (err) {
          return res.status(404).json({ message: "error while hashing!" });
        }

        const final = await Signup.create({
          name: name,
          email: email,
          password: result,
        });
        res.status(200).json({ data: final });
      });
    }
  } catch (err) {
    console.log("ADDING:  ", err);
    res.status(500).json({ massage: "server error: ", err });
  }
};

const singinuser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const data = await Signup.findOne({ where: { email: email } });

    if (!data) {
      return res.status(400).json({ message: "user doesn't exists!" });
    }
    await bcrypt.compare(password, data.password, async (err, result) => {
      if (err) {
        return res.status(404).json({ message: "error while decrypting!" });
      }
      if (result) {
        const token = await JWT.sign(
          { name: data.name, id: data.id },
          "secretkey"
        );
        console.log(token);
        const final = data;
        res.status(200).json({ data: final, token });
      } else {
        return res.status(404).json({ message: "wrong password!" });
      }
    });
  } catch (err) {
    console.log("Login:  ", err);
    res.status(500).json({ massage: "server error: ", err });
  }
};

module.exports = {
  addUser,
  singinuser,
};
