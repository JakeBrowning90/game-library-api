require("dotenv").config();

const express = require("express");
//multer
//cloudinary
//streamifier

//expressSession
//passport
//jwt

const app = express();

// Routers
const indexRouter = require("./routes/index");
const gameRouter = require("./routes/game");
const tagRouter = require("./routes/tag");

app.use("/", indexRouter);
app.use("/game", gameRouter);
app.use("/tag", tagRouter);

// Fallback error route
app.get("*", (req, res, next) => {
  res.send("Hello, world!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
