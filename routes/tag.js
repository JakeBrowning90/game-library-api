const express = require("express");
const router = express.Router();

// Require controller
const tagController = require("../controllers/tagController");

// Routes
// router.post/get/put/delete('/', tagController.function_name)

// CREATE Tag
router.post("/", tagController.create_tag);

// READ Tag
router.get("/", tagController.read_tag);

// UPDATE Tag
router.put("/", tagController.update_tag);

// DELETE Tag
router.delete("/", tagController.delete_tag);

module.exports = router;
