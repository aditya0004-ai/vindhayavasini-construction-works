const jwt = require("jsonwebtoken");

// Protects any route it's attached to — requires a valid Bearer token
// issued by POST /api/auth/login
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorized. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // { username, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Not authorized. Invalid or expired token." });
  }
};

module.exports = { protect };