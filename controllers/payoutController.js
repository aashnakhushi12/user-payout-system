const Sale = require("../models/Sale");
const User = require("../models/User");
const Payout = require("../models/Payout");

// Advance Payout (10%)
const advancePayout = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.saleId);
    console.log("Sale advancePaid:", sale.advancePaid);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found.",
      });
    }

    if (sale.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Advance payout is allowed only for pending sales.",
      });
    }

    if (sale.advancePaid) {
      return res.status(400).json({
        success: false,
        message: "Advance payout already given.",
      });
    }

    const advanceAmount = sale.amount * 0.1;

    await Payout.create({
      user: sale.user,
      sale: sale._id,
      type: "ADVANCE",
      amount: advanceAmount,
      status: "SUCCESS",
      remarks: "10% Advance Payout",
    });

    await User.findByIdAndUpdate(sale.user, {
      $inc: {
        walletBalance: advanceAmount,
      },
    });

    sale.advancePaid = true;
    sale.advanceAmount = advanceAmount;

    await sale.save();

    res.status(200).json({
      success: true,
      message: "Advance payout processed successfully.",
      advanceAmount,
      sale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Retry Failed Payout
const retryFailedPayout = async (req, res) => {
  try {
    const payout = await Payout.findById(req.params.payoutId);

    if (!payout) {
      return res.status(404).json({
        success: false,
        message: "Payout not found.",
      });
    }

    if (payout.status !== "FAILED") {
      return res.status(400).json({
        success: false,
        message: "Only failed payouts can be retried.",
      });
    }

    // Credit wallet
    await User.findByIdAndUpdate(payout.user, {
      $inc: {
        walletBalance: payout.amount,
      },
    });

    payout.status = "SUCCESS";
    payout.failureReason = "";

    await payout.save();

    res.status(200).json({
      success: true,
      message: "Payout recovered successfully.",
      payout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Simulate Failed Payout (Testing)
const simulateFailedPayout = async (req, res) => {
  try {
    const { saleId } = req.body;

    const sale = await Sale.findById(saleId);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found.",
      });
    }

    const payout = await Payout.create({
      user: sale.user,
      sale: sale._id,
      type: "ADJUSTMENT",
      amount: 100,
      status: "FAILED",
      failureReason: "Bank server unavailable",
      remarks: "Testing Failed Payout Recovery",
    });

    res.status(201).json({
      success: true,
      message: "Failed payout created successfully.",
      payout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFinalPayout = async (req, res) => {
  try {
    const { userId } = req.params;

    const sales = await Sale.find({
      user: userId,
      status: { $in: ["APPROVED", "REJECTED"] },
    });

    if (sales.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reconciled sales found for this user.",
      });
    }

    let approvedSales = 0;
    let rejectedSales = 0;
    let finalPayout = 0;

    sales.forEach((sale) => {
      if (sale.status === "APPROVED") {
        approvedSales++;
        finalPayout += sale.amount - sale.advanceAmount;
      } else if (sale.status === "REJECTED") {
        rejectedSales++;
        finalPayout -= sale.advanceAmount;
      }
    });

    return res.status(200).json({
      success: true,
      userId,
      approvedSales,
      rejectedSales,
      totalReconciledSales: sales.length,
      finalPayout,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  advancePayout,
  retryFailedPayout,
  simulateFailedPayout,
  getFinalPayout,
};
