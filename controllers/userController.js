const asyncHandler = require("express-async-handler");

// To-do: validate create user
const validateUser = require("../middleware/validateUser");

// Import Prisma
const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const prisma = new PrismaClient();
// exports.function_name = asyncHandler(async(req, res, next) => {

// })

exports.create_user = [
  validateUser,
  asyncHandler(async (req, res, next) => {
    // Send Error messages if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      // To-do: Password Encryption
      await prisma.user.create({
        data: {
          username: req.body.username,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
          isDemo: req.body.isDemo,
        },
      });

      res.json("Created user " + req.body.username);
    }
  }),
];

exports.read_user_many = asyncHandler(async (req, res, next) => {
  // To-do: Validation
  // To-do: Error messages
  // To-do: Encryption
  const allUsers = await prisma.user.findMany({});
  res.json(allUsers);
});

exports.read_user = asyncHandler(async (req, res, next) => {
  // To-do: Validation
  // To-do: Error messages
  // To-do: Encryption
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(user);
});

exports.update_user = [
  validateUser,
  asyncHandler(async (req, res, next) => {
    // Send Error messages if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      // To-do: Password Encryption
      const user = await prisma.user.update({
        where: { id: parseInt(req.params.id) },
        data: {
          username: req.body.username,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
          isDemo: req.body.isDemo,
        },
      });
      res.json(user);
    }
  }),
];

exports.delete_user = asyncHandler(async (req, res, next) => {
  // To-do: Error messages
  await prisma.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json("Deleted user");
});
