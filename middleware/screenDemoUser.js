screenDemoUser = (req, res, next) => {
  // Block if demo user
  const demoStatus = req.headers["demo"];
  if (demoStatus == "true") {
    res.sendStatus(401).json("Unauthorized");
  } else {
    next();
  }
};

module.exports = screenDemoUser;
