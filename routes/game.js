const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
// Require controller
const gameController = require("../controllers/gameController");

// Routes
// router.post/get/put/delete('/', gameController.function_name)

// CREATE Game
router.post("/", verifyToken, gameController.create_game);

// READ Many Games
router.get("/", gameController.read_game_many);

// READ 1 Game
router.get("/:id", gameController.read_game);

// UPDATE Game
router.put("/:id", verifyToken, gameController.update_game);

// DELETE Game
router.delete("/:id", verifyToken, gameController.delete_game);

module.exports = router;
