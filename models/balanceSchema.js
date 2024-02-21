const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    default: 1000,
  },
  currency: {
    type: String,
    default: "FakeMoney",
  },
});

const Balance = mongoose.model("Balance", balanceSchema);
module.exports = Balance;
