const Transaction = require("../models/transactionSchema");
const User = require("../models/userSchema");
const Balance = require("../models/balanceSchema");
const mongoose = require("mongoose");

const makeTransaction = async (req, res) => {
  const { origin, destination, amount, notes } = req.body;

  if (amount <= 0) {
    return res.status(400).json({
      status: 400,
      message: "Amount must be greater than 0",
    });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(origin)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid origin id",
      });
    }
    const userOrigin = await User.findById(origin);
    if (!userOrigin) {
      return res.status(404).json({
        status: 404,
        message: "Origin user not found",
      });
    }

    //get destination user by alias or cvu

    const destinationUser = await User.findOne({
      $or: [{ alias: destination }, { cvu: destination }],
    });

    const destinationId = destinationUser._id;

    if (!destinationUser) {
      return res.status(404).json({
        status: 404,
        message: "Destination user not found",
      });
    }

    //check if origin user has enough funds

    const checkOriginAcount = await Balance.findOne({ user: origin });
    if (checkOriginAcount.balance <= amount) {
      return res.status(400).json({
        status: 400,
        message: "Insufficient funds",
      });
    }

    // create transaction

    const transaction = new Transaction({
      origin,
      destination: destinationId,
      amount,
      notes,
    });

    await transaction.save();
    res.status(201).json({
      status: 201,
      message: "Transaction created successfully",
      transaction,
    });

    // update balances
    const originBalance = await Balance.findOneAndUpdate(
      { user: origin },
      { $inc: { balance: -amount } },
      { new: true }
    );
    const destinationBalance = await Balance.findOneAndUpdate(
      { user: destinationId },
      { $inc: { balance: amount } },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { makeTransaction };
