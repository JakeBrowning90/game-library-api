require("dotenv").config();

const express = require("express");
//multer
//cloudinary
//streamifier

//expressSession
//passport
//jwt

const app = express();

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
