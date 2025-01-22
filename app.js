require("dotenv").config();

const express = require("express");
//multer
//cloudinary
//streamifier

//expressSession
//passport
require("./middleware/passport")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//jwt

const app = express();

// Passport to routes
app.use(passport.initialize());

// Parse form payloads and sets to req.body
app.use(express.urlencoded({ extended: false }));

// Routers
// const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const gameRouter = require("./routes/game");
const tagRouter = require("./routes/tag");

// app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/game", gameRouter);
app.use("/tag", tagRouter);

// Fallback error route
app.get("*", (req, res, next) => {
  res.send("Not a route.");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
