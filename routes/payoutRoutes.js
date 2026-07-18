const express = require("express");
const router = express.Router();

const { advancePayout } = require("../controllers/payoutController");

// Advance Payout
router.post("/advance/:saleId", advancePayout);

module.exports = router;
