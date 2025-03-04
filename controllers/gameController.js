const asyncHandler = require("express-async-handler");

// To-do: validate create game
const validateGame = require("../middleware/validateGameCreate");

// Import Prisma
const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const validateGameUpdate = require("../middleware/validateGameUpdate");
const validateGameCreate = require("../middleware/validateGameCreate");
const prisma = new PrismaClient();
// exports.function_name = asyncHandler(async(req, res, next) => {

// })

exports.create_game = [
  validateGameCreate,
  asyncHandler(async (req, res, next) => {
    // Send Error messages if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      // Convert empty string to null (TEMP?)
      if (!req.body.timeMax) {
        req.body.timeMax = null;
      }
      if (!req.body.playerCtMax) {
        req.body.playerCtMax = null;
      }
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
  const qTitle = req.query.title || "";
  const qWeight = req.query.weight || "";
  const qCount = parseInt(req.query.count) || undefined;
  let qTags;
  if (!req.query.tags || req.query.tags[0] == "") {
    qTags = undefined;
  } else {
    qTags = req.query.tags;
  }

  if (qCount && qTags) {
    const foundGames = await prisma.game.findMany({
      orderBy: [
        {
          title: "asc",
        },
      ],
      where: {
        title: {
          contains: qTitle,
          mode: "insensitive",
        },
        gameWeight: {
          contains: qWeight,
        },
        OR: [
          {
            playerCtMin: qCount,
          },
          {
            playerCtMin: {
              lte: qCount,
            },
            playerCtMax: {
              gte: qCount,
            },
          },
        ],
        tags: {
          some: { id: parseInt(qTags) },
        },
      },
    });
    res.json(foundGames);
  } else if (qCount && !qTags) {
    const foundGames = await prisma.game.findMany({
      orderBy: [
        {
          title: "asc",
        },
      ],
      where: {
        title: {
          contains: qTitle,
          mode: "insensitive",
        },
        gameWeight: {
          contains: qWeight,
        },
        OR: [
          {
            playerCtMin: qCount,
          },
          {
            playerCtMin: {
              lte: qCount,
            },
            playerCtMax: {
              gte: qCount,
            },
          },
        ],
      },
    });
    res.json(foundGames);
  } else if (!qCount && qTags) {
    const foundGames = await prisma.game.findMany({
      orderBy: [
        {
          title: "asc",
        },
      ],
      where: {
        title: {
          contains: qTitle,
          mode: "insensitive",
        },
        gameWeight: {
          contains: qWeight,
        },
        tags: {
          some: { id: parseInt(qTags) },
        },
      },
    });
    res.json(foundGames);
  } else {
    const foundGames = await prisma.game.findMany({
      orderBy: [
        {
          title: "asc",
        },
      ],
      where: {
        title: {
          contains: qTitle,
          mode: "insensitive",
        },
        gameWeight: {
          contains: qWeight,
        },
      },
    });
    res.json(foundGames);
  }
});

// Return only games in circulation
exports.read_game_circ = asyncHandler(async (req, res, next) => {
  const qTitle = req.query.title || "";
  const qWeight = req.query.weight || "";
  const qCount = parseInt(req.query.count);
  let qTags;
  if (!req.query.tags || req.query.tags[0] == "") {
    qTags = undefined;
  } else {
    qTags = req.query.tags;
  }

  if (qCount && qTags) {
    const foundGames = await prisma.game.findMany({
      orderBy: [
        {
          title: "asc",
        },
      ],
      where: {
        title: {
          contains: qTitle,
          mode: "insensitive",
        },
        gameWeight: {
          contains: qWeight,
        },
        OR: [
          {
            playerCtMin: qCount,
          },
          {
            playerCtMin: {
              lte: qCount,
            },
            playerCtMax: {
              gte: qCount,
            },
          },
        ],
        tags: {
          some: { id: parseInt(qTags) },
        },
        inCirc: true,
      },
    });
    res.json(foundGames);
  } else if (qCount && !qTags) {
    const foundGames = await prisma.game.findMany({
      orderBy: [
        {
          title: "asc",
        },
      ],
      where: {
        title: {
          contains: qTitle,
          mode: "insensitive",
        },
        gameWeight: {
          contains: qWeight,
        },
        OR: [
          {
            playerCtMin: qCount,
          },
          {
            playerCtMin: {
              lte: qCount,
            },
            playerCtMax: {
              gte: qCount,
            },
          },
        ],
        inCirc: true,
      },
    });
    res.json(foundGames);
  } else if (!qCount && qTags) {
    const foundGames = await prisma.game.findMany({
      orderBy: [
        {
          title: "asc",
        },
      ],
      where: {
        title: {
          contains: qTitle,
          mode: "insensitive",
        },
        gameWeight: {
          contains: qWeight,
        },
        tags: {
          some: { id: parseInt(qTags) },
        },
        inCirc: true,
      },
    });
    res.json(foundGames);
  } else {
    const foundGames = await prisma.game.findMany({
      orderBy: [
        {
          title: "asc",
        },
      ],
      where: {
        title: {
          contains: qTitle,
          mode: "insensitive",
        },
        gameWeight: {
          contains: qWeight,
        },
        inCirc: true,
      },
    });
    res.json(foundGames);
  }
});

exports.read_game = asyncHandler(async (req, res, next) => {
  const game = await prisma.game.findUnique({
    include: {
      tags: {
        orderBy: {
          tagName: "asc",
        },
        select: {
          tagName: true,
          id: true,
        },
      },
    },
    where: { id: parseInt(req.params.id) },
  });
  res.json(game);
});

exports.update_game = [
  validateGameUpdate,
  asyncHandler(async (req, res, next) => {
    // Send Error messages if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      // Convert empty string to null (TEMP?)
      if (!req.body.timeMax) {
        req.body.timeMax = null;
      }
      if (!req.body.playerCtMax) {
        req.body.playerCtMax = null;
      }
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
