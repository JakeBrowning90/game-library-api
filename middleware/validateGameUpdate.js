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
  body("ageRec")
    .toInt()
    .isInt({ gt: 0, lt: 19 })
    .withMessage("Enter a minimum age recommendation (1 - 18)."),
  body("playerCtMin")
    .toInt()
    .isInt({ gt: 0, lt: 10 })
    .withMessage("Enter a minimum player count."),
  body("playerCtMax")
    .optional({ checkFalsy: true, nullable: true })
    .toInt()
    .isInt({ gt: -1, lt: 10 }),
  body("timeMin")
    .toInt()
    .isInt({ gt: 0, lt: 301 })
    .withMessage("Enter a minimum playtime in minutes (1 - 300)."),
  body("timeMax")
    .optional({ checkFalsy: true, nullable: true })
    .toInt()
    .isInt({ gt: -1, lt: 300 }),
  body("gameWeight")
    .trim()
    .notEmpty()
    .withMessage("Select a challenge rating."),
  body("inCirc").toBoolean(),
];

module.exports = validateGameUpdate;
