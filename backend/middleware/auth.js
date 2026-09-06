const jwt = require("jsonwebtoken");

/*
=================================
 AUTH MIDDLEWARE
=================================
*/

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. No token provided.",
    });
  }

  // Extract token safely
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. No token provided.",
    });
  }

  try {
    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach authenticated admin/user data
    req.admin = decoded;

    next();
  } catch (err) {
    console.error("JWT Authentication Error:", err.message);

    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid or expired token.",
    });
  }
};

module.exports = { protect };