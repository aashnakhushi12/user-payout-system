const express = require("express");
const router = express.Router();

const {
  createSale,
  getAllSales,
  getSaleById,
  reconcileSale,
} = require("../controllers/saleController");

router.post("/", createSale);
router.get("/", getAllSales);
router.get("/:id", getSaleById);
router.put("/reconcile/:saleId", reconcileSale);

module.exports = router;
