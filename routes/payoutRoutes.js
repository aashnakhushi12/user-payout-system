const express = require("express");
const router = express.Router();

const {
  advancePayout,
  retryFailedPayout,
  simulateFailedPayout,
} = require("../controllers/payoutController");

// Advance payout
router.post("/advance/:saleId", advancePayout);

// Retry failed payout
router.put("/retry/:payoutId", retryFailedPayout);

// Simulate failed payout
router.post("/simulate-failure", simulateFailedPayout);

module.exports = router;
