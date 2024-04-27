const express = require("express");

const {
  purchase,
  updatePurchase,
  updatePurchaseFailed,
} = require("../controller/paymentcontroller.js");

const auth = require("../middleware/userauth.js");

const router = express.Router();

router.get("/premium", auth, purchase);
router.post("/updatepremium", auth, updatePurchase);
router.post("/updatepremiumfailed", auth, updatePurchaseFailed);

module.exports = router;
