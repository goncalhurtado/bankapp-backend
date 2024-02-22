const Transaction = require("../models/transactionSchema");
const User = require("../models/userSchema");
const Balance = require("../models/balanceSchema");

const makeTransaction = async (req, res) => {
  const { origin, destination, amount, notes } = req.body;
  try {
    const userOrigin = await User.findById(origin);
    if (!userOrigin) {
      return res.status(404).json({
        status: 404,
        message: "Origin user not found",
      });
    }
    const userDestination = await User.findById(destination);
    if (!userDestination) {
      return res.status(404).json({
        status: 404,
        message: "Destination user not found",
      });
    }

    const checkOriginAcount = await Balance.findOne({ user: origin });
    if (checkOriginAcount.balance <= amount) {
      return res.status(400).json({
        status: 400,
        message: "Insufficient funds",
      });
    }

    const originBalance = await Balance.findOneAndUpdate(
      { user: origin },
      { $inc: { balance: -amount } },
      { new: true }
    );
    const destinationBalance = await Balance.findOneAndUpdate(
      { user: destination },
      { $inc: { balance: amount } },
      { new: true }
    );

    const transaction = new Transaction({ origin, destination, amount, notes });

    await transaction.save();
    res.status(201).json({
      status: 201,
      message: "Transaction created successfully",
      transaction,
      originBalance,
      destinationBalance,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { makeTransaction };
