const asyncHandler = require("express-async-handler");

// exports.function_name = asyncHandler(async(req, res, next) => {

// })

exports.create_game = asyncHandler(async (req, res, next) => {
  res.json("Create game route");
});

exports.read_game = asyncHandler(async (req, res, next) => {
  res.json("Read game route");
});

exports.update_game = asyncHandler(async (req, res, next) => {
  res.json("Update game route");
});

exports.delete_game = asyncHandler(async (req, res, next) => {
  res.json("Delete game route");
});
