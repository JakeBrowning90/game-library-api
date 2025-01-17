const asyncHandler = require("express-async-handler");

// To-do: validate create user
const validateUser = require("../middleware/validateUser");

// Import Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// exports.function_name = asyncHandler(async(req, res, next) => {

// })

exports.create_user = [
  validateUser,
  asyncHandler(async (req, res, next) => {
    // To-do: Validation
    // To-do: Error messages
    // To-do: Encryption
    console.log(req.body);
    // Placeholder bool adapter utility
    let isAdmin = false;
    if (req.body.isAdmin) {
      isAdmin = true
    }
    let isDemo = false;
    if (req.body.isDemo) {
      isDemo = true
    }
    //bool adapter utility END
    await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
        isAdmin: isAdmin,
        isDemo: isDemo,
      },
    });

    res.json("Created user " + req.body.username);
  }),
];

exports.read_user = asyncHandler(async (req, res, next) => {
  res.json("Read user route");
});

exports.update_user = asyncHandler(async (req, res, next) => {
  res.json("Update user route");
});

exports.delete_user = asyncHandler(async (req, res, next) => {
  res.json("Delete user route");
});
