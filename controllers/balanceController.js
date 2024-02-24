const Balance = require("../models/balanceSchema");

const getBalanceAmount = async (req, res) => {
  const { user } = req.params;
  try {
    const balance = await Balance.findOne({ user: user });
    if (!balance) {
      return res.status(404).json({
        status: 404,
        message: "Balance not found",
      });
    }

    const balanceAmount = balance.balance;

    res.status(200).json({
      status: 200,
      message: "Balance found",
      balanceAmount,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllBalances = async (req, res) => {
  try {
    const balances = await Balance.find();
    res.status(200).json({
      status: 200,
      message: "All balances",
      data: balances,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// testing

const deleteAllBalancesAcount = async (req, res) => {
  try {
    await Balance.deleteMany();
    res.status(200).json({
      status: 200,
      message: "All balances deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBalanceAmount, getAllBalances, deleteAllBalancesAcount };
