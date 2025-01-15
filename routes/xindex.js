const express = require("express");
const router = express.Router();

// Require controller
const indexController = require("../controllers/xindexController");

// Routes
// router.post/get/put/delete('/', indexController.function_name)

// Test index route
router.get("/", indexController.get_index);

module.exports = router;
