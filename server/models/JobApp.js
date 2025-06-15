const mongoose = require("mongoose");

const jobAppSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "rejected", "offer"],
    },
    notes: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobApp", jobAppSchema);
