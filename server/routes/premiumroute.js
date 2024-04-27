const { getUserLeaderBoard } = require("../controller/premiumcontroller.js");
const express = require("express");
const router = express.Router();

router.get("/premiumfeature", getUserLeaderBoard);

module.exports = router;
