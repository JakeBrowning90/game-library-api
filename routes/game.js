const express = require("express");
const router = express.Router();

// Require controller
const gameController = require("../controllers/gameController");

// Routes
// router.post/get/put/delete('/', gameController.function_name)

// CREATE Game
router.post("/", gameController.create_game);

// READ Game
router.get("/", gameController.read_game);

// UPDATE Game
router.put("/", gameController.update_game);

// DELETE Game
router.delete("/", gameController.delete_game);

module.exports = router;
