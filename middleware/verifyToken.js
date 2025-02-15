const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  //Test confirmation check
  const confirmStatus = req.headers["confirmation"];
  if (confirmStatus == "false") {
    res.sendStatus(401).json("Unauthorized");
  }
  // get auth header value
  const bearerHeader = req.headers["authorization"];
  // Separate token from 'Bearer ' header
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    try {
      jwt.verify(req.token, process.env.SECRET_KEY);
    } catch (err) {
      res.sendStatus(401);
    }

    next();
  } else {
    res.sendStatus(401).json("Unauthorized");
  }
};

module.exports = verifyToken;
