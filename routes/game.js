const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const screenDemoUser = require("../middleware/screenDemoUser");

// Require controller
const gameController = require("../controllers/gameController");

// Routes
// router.post/get/put/delete('/', gameController.function_name)

// CREATE Game
router.post("/", verifyToken, screenDemoUser, gameController.create_game);

// READ All Games
router.get("/", gameController.read_game_many);

// READ Games in Circulation
router.get("/circ", gameController.read_game_circ);

// READ 1 Game
router.get("/:id", gameController.read_game);

// UPDATE Game
router.put("/:id", verifyToken, screenDemoUser, gameController.update_game);

// DELETE Game
router.delete("/:id", verifyToken, screenDemoUser, gameController.delete_game);

module.exports = router;
