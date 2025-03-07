const asyncHandler = require("express-async-handler");

// To-do: validate create tag
const validateTag = require("../middleware/validateTag");

// Import Prisma
const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const prisma = new PrismaClient();
// exports.function_name = asyncHandler(async(req, res, next) => {

// })

exports.create_tag = [
  validateTag,
  asyncHandler(async (req, res, next) => {
    // Send Error messages if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      await prisma.tag.create({
        data: {
          tagName: req.body.tagName,
        },
      });
      res.json("Created tag " + req.body.tagName);
    }
  }),
];

exports.read_tag_many = asyncHandler(async (req, res, next) => {
  const query = req.query.tagname || "";
  const allTags = await prisma.tag.findMany({
    orderBy: [
      {
        tagName: "asc",
      },
    ],
    where: {
      tagName: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  res.json(allTags);
});

exports.read_tag = asyncHandler(async (req, res, next) => {
  const tag = await prisma.tag.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(tag);
});

exports.update_tag = [
  validateTag,
  asyncHandler(async (req, res, next) => {
    // Send Error messages if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      const tag = await prisma.tag.update({
        where: { id: parseInt(req.params.id) },
        data: {
          tagName: req.body.tagName,
        },
      });
      res.json(tag);
    }
  }),
];

exports.delete_tag = asyncHandler(async (req, res, next) => {
  await prisma.tag.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json("Deleted tag");
});
