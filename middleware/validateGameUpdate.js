const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateGameUpdate = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Title must contain between 1 and 50 characters."),
  body("desc")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Description must contain between 1 and 500 characters."),
  body("timeMin").toInt(),
  body("timeMax").toInt().optional({ checkFalsy: true, nullable: true }),
  body("playerCtMin").toInt(),
  body("playerCtMax").toInt().optional({ checkFalsy: true, nullable: true }),
  body("ageRec").toInt(),
  body("gameWeight").trim(),
  body("inCirc").toBoolean(),
];

module.exports = validateGameUpdate;
