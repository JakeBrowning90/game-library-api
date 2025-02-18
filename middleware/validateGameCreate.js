const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateGameCreate = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Title must contain between 1 and 50 characters.")
    .custom(async (value) => {
      const existingGame = await prisma.game.findUnique({
        where: {
          title: value,
        },
      });
      if (existingGame) {
        throw new Error("Title already in use.");
      }
    }),
  body("desc")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Description must contain between 1 and 500 characters."),
  body("ageRec")
    .isInt({ gt: 0, lt: 19 })
    .withMessage("Enter a minimum age recommendation (1 - 18)."),
  body("playerCtMin")
    .isInt({ gt: 0, lt: 10 })
    .withMessage("Enter a minimum player count."),
  body("playerCtMax")
    .isInt({ gt: -1, lt: 10 })
    .optional({ checkFalsy: true, nullable: true }),
  body("timeMin")
    .isInt({ gt: 0, lt: 301 })
    .withMessage("Enter a minimum playtime in minutes (1 - 300)."),
  body("timeMax")
    .isInt({ gt: -1, lt: 300 })
    .optional({ checkFalsy: true, nullable: true }),
  body("gameWeight")
    .trim()
    .notEmpty()
    .withMessage("Select a challenge rating."),
  body("inCirc").toBoolean(),
];

module.exports = validateGameCreate;
