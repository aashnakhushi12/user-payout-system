const express = require("express");
const router = express.Router();

const { requestWithdrawal } = require("../controllers/withdrawalController");

// Request Withdrawal
router.post("/", requestWithdrawal);

module.exports = router;
