const router = require("express").Router();
const {
  getAllUsers,
  registerUser,
  deleteUser,
  createBalanceById,
  getUserByCvuOrAlias,
  login,
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
const { getContactsByUser } = require("../controllers/contactController");

// User routes

router.get("/users", getAllUsers);
router.post("/user", registerUser);
router.delete("/user/:id", deleteUser);
router.get("/checkDestination/:destination", getUserByCvuOrAlias);
router.post("/login", login);

//test
router.post("/balance/:user", createBalanceById);

// Transaction routes
router.post("/transaction", makeTransaction);
router.get("/transactions/:user", getTransactionsByUser); //page and limit on query

// Balance routes
router.get("/balance/:user", getBalanceAmount);
router.get("/balances", getAllBalances);
router.delete("/balances/all", deleteAllBalancesAcount);

// Contact routes
router.get("/contacts/:user", getContactsByUser);

module.exports = router;
