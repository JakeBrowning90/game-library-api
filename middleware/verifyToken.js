const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  // get auth header value
  const bearerHeader = req.headers["authorization"];
  // Separate token from 'Bearer ' header
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    // jwt.verify(req.token, process.env.SECRET_KEY);
    try {
      jwt.verify(req.token, process.env.SECRET_KEY);
      // console.log(verify)
    } catch (err) {
      res.sendStatus(401);
    }

    next();
  } else {
    res.sendStatus(401).json("Unauthorized");
  }
};

module.exports = verifyToken;
