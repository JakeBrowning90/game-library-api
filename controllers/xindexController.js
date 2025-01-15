const asyncHandler = require("express-async-handler");

// exports.function_name = asyncHandler(async(req, res, next) => {

// })

exports.get_index = asyncHandler(async (req, res, next) => {
    res.json("Get index route")
});
