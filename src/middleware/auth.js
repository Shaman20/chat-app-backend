const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const tokenWithoutBearer = token.slice(7);

    const decoded = jwt.verify(tokenWithoutBearer, config.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};

module.exports = verifyToken;
