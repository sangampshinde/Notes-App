const jwt = require("jsonwebtoken");
const User = require("./models/user.model");

// Middleware to validate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
    if (err) {
      return res.sendStatus(401); // Forbidden
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
