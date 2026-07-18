const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to User Payout Management System API 🚀",
  });
});

module.exports = app;
