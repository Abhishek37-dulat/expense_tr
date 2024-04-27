const express = require("express");

const {
  purchase,
  updatePurchase,
} = require("../controller/paymentcontroller.js");

const auth = require("../middleware/userauth.js");

const router = express.Router();

router.get("/premium", auth, purchase);
router.post("/updatepremium", auth, updatePurchase);

module.exports = router;
