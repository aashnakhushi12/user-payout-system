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

module.exports = {
  advancePayout,
};
