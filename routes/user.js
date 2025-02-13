const express = require("express");
const router = express.Router();
const passport = require("passport");
const verifyToken = require("../middleware/verifyToken");

// Require controller
const userController = require("../controllers/userController");

// Routes
// router.post/get/put/delete('/', userController.function_name)

// CREATE User
router.post("/", userController.create_user);

// READ MANY Users
router.get("/", userController.read_user_many);

// READ 1 User
router.get("/:id", userController.read_user);

// UPDATE User
router.put("/:id", verifyToken, userController.update_user);

// DELETE User
router.delete("/:id", verifyToken, userController.delete_user);

// Login
router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
  }),
  userController.user_login
);

// TEST Route - Authentication check
// router.post("/check", verifyToken, userController.token_check);

module.exports = router;
