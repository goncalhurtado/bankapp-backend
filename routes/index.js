const router = require("express").Router();
const {
  getAllUsers,
  registerUser,
  deleteUser,
  createBalanceById,
} = require("../controllers/userController");
const {
  makeTransaction,
  getTransactionsByUser,
} = require("../controllers/transactionController");
const {
  getBalanceAmount,
  getAllBalances,
  deleteAllBalancesAcount,
} = require("../controllers/balanceController");

// User routes

router.get("/users", getAllUsers);
router.post("/user", registerUser);
router.delete("/user/:id", deleteUser);

//test
router.post("/balance/:user", createBalanceById);

// Transaction routes
router.post("/transaction", makeTransaction);
router.get("/transactions/:user", getTransactionsByUser); //page and limit on query

// Balance routes
router.get("/balance/:user", getBalanceAmount);
router.get("/balances", getAllBalances);
router.delete("/balances/all", deleteAllBalancesAcount);

module.exports = router;
