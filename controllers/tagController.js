const asyncHandler = require("express-async-handler");

// exports.function_name = asyncHandler(async(req, res, next) => {

// })

exports.create_tag = asyncHandler(async (req, res, next) => {
  res.json("Create tag route");
});

exports.read_tag = asyncHandler(async (req, res, next) => {
  res.json("Read tag route");
});

exports.update_tag = asyncHandler(async (req, res, next) => {
  res.json("Update tag route");
});

exports.delete_tag = asyncHandler(async (req, res, next) => {
  res.json("Delete tag route");
});
