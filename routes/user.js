const express = require("express");
const router = express.Router();

// Require controller
const userController = require("../controllers/userController");

// Routes
// router.post/get/put/delete('/', userController.function_name)

// CREATE User
router.post('/', userController.create_user)

// READ MANY Users
router.get('/', userController.read_user_many)

// READ 1 User
router.get('/:id', userController.read_user)

// UPDATE User
router.put('/:id', userController.update_user)

// DELETE User
router.delete('/:id', userController.delete_user)

module.exports = router;