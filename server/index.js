const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database.js");
const expense = require("./routes/expenseroutes.js");

const app = express();
app.use(cors());
const port = 8001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/signup", expense);

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
