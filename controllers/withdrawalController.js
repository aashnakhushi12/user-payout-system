const Withdrawal = require("../models/Withdrawal");
const User = require("../models/User");

// Request Withdrawal
const requestWithdrawal = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check wallet balance
    if (user.walletBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance.",
      });
    }

    // Check 24-hour rule
    if (user.lastWithdrawalAt) {
      const lastWithdrawal = new Date(user.lastWithdrawalAt);
      const now = new Date();

      const hours = (now - lastWithdrawal) / (1000 * 60 * 60);

      if (hours < 24) {
        return res.status(400).json({
          success: false,
          message: "Withdrawal allowed only once every 24 hours.",
        });
      }
    }

    // Create withdrawal
    const withdrawal = await Withdrawal.create({
      user: user._id,
      amount,
      status: "SUCCESS",
      processedAt: new Date(),
    });

    // Update wallet
    user.walletBalance -= amount;
    user.lastWithdrawalAt = new Date();

    await user.save();

    res.status(201).json({
      success: true,
      message: "Withdrawal processed successfully.",
      withdrawal,
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  requestWithdrawal,
};
