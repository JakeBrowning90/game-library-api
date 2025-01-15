const express = require("express");
const router = express.Router();

// Require controller
const userController = require("../controllers/userController");

// Routes
// router.post/get/put/delete('/', userController.function_name)

// CREATE User
router.post('/', userController.create_user)

// READ User
router.get('/', userController.read_user)

// UPDATE User
router.put('/', userController.update_user)

// DELETE User
router.delete('/', userController.delete_user)

module.exports = router;