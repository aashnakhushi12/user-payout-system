const express = require("express");
const router = express.Router();

const {
  advancePayout,
  retryFailedPayout,
  simulateFailedPayout,
  getFinalPayout,
} = require("../controllers/payoutController");

// Advance payout
router.post("/advance/:saleId", advancePayout);

// Retry failed payout
router.put("/retry/:payoutId", retryFailedPayout);

// Simulate failed payout
router.post("/simulate-failure", simulateFailedPayout);

// Get final payout
router.get("/final/:userId", getFinalPayout);

module.exports = router;
