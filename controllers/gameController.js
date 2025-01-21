const asyncHandler = require("express-async-handler");

// To-do: validate create game
const validateGame = require("../middleware/validateGame");

// Import Prisma
const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const prisma = new PrismaClient();
// exports.function_name = asyncHandler(async(req, res, next) => {

// })

exports.create_game = [
  validateGame,
  asyncHandler(async (req, res, next) => {
    // Send Error messages if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      console.log(req.body);

      // if (!req.body.timeMax) {
      //   req.body.timeMax = null;
      // }
      console.log(req.body);

      const newGame = await prisma.game.create({
        data: {
          title: req.body.title,
          desc: req.body.desc,
          timeMin: req.body.timeMin,
          timeMax: req.body.timeMax,
          playerCtMin: req.body.playerCtMin,
          playerCtMax: req.body.playerCtMax,
          ageRec: req.body.ageRec,
          gameWeight: req.body.gameWeight,
          inCirc: req.body.inCirc,
          tags: {
            ...(req.body.tags
              ? {
                  connect: req.body.tags?.map((c) => ({
                    id: parseInt(c),
                  })),
                }
              : []),
          },
        },
      });
      res.json(newGame);
    }
  }),
];

exports.read_game_many = asyncHandler(async (req, res, next) => {
  const allGames = await prisma.game.findMany({});
  res.json(allGames);
});

exports.read_game = asyncHandler(async (req, res, next) => {
  const game = await prisma.game.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(game);
});

exports.update_game = [
  validateGame,
  asyncHandler(async (req, res, next) => {
    // Send Error messages if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      await prisma.game.update({
        where: { id: parseInt(req.params.id) },
        data: {
          tags: {
            set: [],
          },
        },
      });
      const game = await prisma.game.update({
        where: { id: parseInt(req.params.id) },
        data: {
          title: req.body.title,
          desc: req.body.desc,
          timeMin: req.body.timeMin,
          timeMax: req.body.timeMax,
          playerCtMin: req.body.playerCtMin,
          playerCtMax: req.body.playerCtMax,
          ageRec: req.body.ageRec,
          gameWeight: req.body.gameWeight,
          inCirc: req.body.inCirc,
          tags: {
            ...(req.body.tags
              ? {
                  connect: req.body.tags?.map((c) => ({
                    id: parseInt(c),
                  })),
                }
              : []),
          },
        },
      });
      res.json(game);
    }
  }),
];

exports.delete_game = asyncHandler(async (req, res, next) => {
  await prisma.game.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json("Deleted game");
});
