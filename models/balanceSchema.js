const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    type: Number,
    default: 1000, // for testing purposes
  },
  currency: {
    type: String,
    default: "FakeMoney",
  },
});

const Balance = mongoose.model("Balance", balanceSchema);
module.exports = Balance;
