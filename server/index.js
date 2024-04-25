const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database.js");
const expense = require("./routes/expenseroutes.js");
const book = require("./routes/catebox.js");
const Signup = require("./models/expense.js");
const ExpenseBook = require("./models/formdata.js");

const app = express();
app.use(cors());
const port = 8001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/exp", expense);
app.use("/api/book", book);

Signup.hasMany(ExpenseBook);
ExpenseBook.belongsTo(Signup);

sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => {
      console.log("listening to port: ", port);
    });
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  });
