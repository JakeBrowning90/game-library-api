const asyncHandler = require("express-async-handler");

// To-do: validate create game
// const validateGame = require("../middleware/validateGame");

// Import Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// exports.function_name = asyncHandler(async(req, res, next) => {

// })

exports.create_game = asyncHandler(async (req, res, next) => {
  console.log(req.body.title);
  console.log(req.body.tags);

  // To-do: Validation
  // To-do: Error messages
  // Placeholder bool adapter utility
  let inCirc = false;
  if (req.body.inCirc) {
    inCirc = true;
  }
  //bool adapter utility END
  const newGame = await prisma.game.create({
    data: {
      title: req.body.title,
      desc: req.body.desc,
      timeMin: parseInt(req.body.timeMin),
      timeMax: parseInt(req.body.timeMax),
      playerCtMin: parseInt(req.body.playerCtMin),
      playerCtMax: parseInt(req.body.playerCtMax),
      ageRec: parseInt(req.body.ageRec),
      gameWeight: req.body.gameWeight,
      inCirc: inCirc,
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
});

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

exports.update_game = asyncHandler(async (req, res, next) => {
  // Placeholder bool adapter utility
  let inCirc = false;
  if (req.body.inCirc) {
    inCirc = true;
  }
  //bool adapter utility END
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
      timeMin: parseInt(req.body.timeMin),
      timeMax: parseInt(req.body.timeMax),
      playerCtMin: parseInt(req.body.playerCtMin),
      playerCtMax: parseInt(req.body.playerCtMax),
      ageRec: parseInt(req.body.ageRec),
      gameWeight: req.body.gameWeight,
      inCirc: inCirc,
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
});

exports.delete_game = asyncHandler(async (req, res, next) => {
  await prisma.game.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json("Deleted game");
});
