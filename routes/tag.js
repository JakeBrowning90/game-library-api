const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
// Require controller
const tagController = require("../controllers/tagController");

// Routes
// router.post/get/put/delete('/', tagController.function_name)

// CREATE Tag
router.post("/", verifyToken, tagController.create_tag);

// READ MANY Tags
router.get("/", tagController.read_tag_many);

// READ 1 Tag
router.get("/:id", tagController.read_tag);

// UPDATE Tag
router.put("/:id", verifyToken, tagController.update_tag);

// DELETE Tag
router.delete("/:id", verifyToken, tagController.delete_tag);

module.exports = router;
