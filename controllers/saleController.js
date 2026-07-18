const Sale = require("../models/Sale");
const User = require("../models/User");

// Create Sale
const createSale = async (req, res) => {
  try {
    const { user, orderId, amount } = req.body;

    // Check if user exists
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check duplicate order
    const existingSale = await Sale.findOne({ orderId });

    if (existingSale) {
      return res.status(400).json({
        success: false,
        message: "Order ID already exists.",
      });
    }

    const sale = await Sale.create({
      user,
      orderId,
      amount,
    });

    res.status(201).json({
      success: true,
      message: "Sale created successfully.",
      data: sale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Sales
const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("user", "name email");

    res.status(200).json({
      success: true,
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Sale By ID
const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: sale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
