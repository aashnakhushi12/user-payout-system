const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    requestedAt: {
      type: Date,
      default: Date.now,
    },

    processedAt: {
      type: Date,
      default: null,
    },

    failureReason: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Withdrawal", withdrawalSchema);
