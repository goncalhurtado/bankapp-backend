const router = require("express").Router();
const {
  getAllUsers,
  registerUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/users", getAllUsers);
router.post("/user", registerUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
