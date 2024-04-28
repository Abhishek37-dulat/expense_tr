const ExpenseBook = require("../models/formdata.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const Signup = require("../models/expense.js");
const sequelize = require("../utils/database.js");

const getAllExpense = (req, res, next) => {
  ExpenseBook.findAll({ where: { expenseId: req.user.id } })
    .then((result) => {
      console.log(result);
      res.status(200).json({ data: result });
    })
    .catch((err) => console.log(err));
};

const addexpense = async (req, res, next) => {
  try {
    const t = await sequelize.transaction();
    const title = req.body.title;
    const amount = req.body.amount;
    const category = req.body.category;
    const data = await ExpenseBook.create(
      {
        title,
        amount,
        category,
        expenseId: req.user.id,
      },
      { transaction: t }
    );
    const user = await Signup.findByPk(req.user.id);
    await user.update(
      {
        total_cost:
          user.total_cost === null
            ? parseInt(amount)
            : parseInt(user.total_cost) + parseInt(amount),
      },
      { transaction: t }
    );
    await t.commit();
    res.status(200).json({ data: data });
  } catch (err) {
    console.log("ADDING:  ", err);
    await t.rollback();
    res.status(500).json({ massage: "server error: ", err });
  }
};

const deleteexpense = async (req, res, next) => {
  try {
    const t = await sequelize.transaction();
    const data = await ExpenseBook.findByPk(req.params.id, {
      where: { expenseId: req.user.id },
      transaction: t,
    });
    const user = await Signup.findByPk(req.user.id);
    await user.update(
      {
        total_cost: user.total_cost - parseInt(data.amount),
      },
      { transaction: t }
    );
    await data.destroy();
    await t.commit();
    res.status(200).json({ data: data });
  } catch (err) {
    console.log("Delete:  ", err);
    await t.rollback();
    res.status(500).json({ massage: "server error: ", err });
  }
};

module.exports = {
  addexpense,
  deleteexpense,
  getAllExpense,
};
