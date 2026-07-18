const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/userRoutes");
const saleRoutes = require("./routes/saleRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);
// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to User Payout Management System API 🚀",
  });
});

module.exports = app;
