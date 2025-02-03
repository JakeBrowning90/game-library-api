const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateTag = [
  body("tagName")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Tag name must contain between 1 and 30 characters.")
    .custom(async (value) => {
      const existingTagName = await prisma.tag.findUnique({
        where: {
          tagName: value,
        },
      });
      if (existingTagName) {
        throw new Error("Tag name already in use.");
      }
    }),
];

module.exports = validateTag;
