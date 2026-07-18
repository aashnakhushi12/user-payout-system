const express = require("express");
const router = express.Router();

const {
  createSale,
  getAllSales,
  getSaleById,
} = require("../controllers/saleController");

router.post("/", createSale);
router.get("/", getAllSales);
router.get("/:id", getSaleById);

module.exports = router;
