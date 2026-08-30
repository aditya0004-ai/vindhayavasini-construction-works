const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /api/auth/login
// Body: { username, password }
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required." });
    }

    const validUsername = username === process.env.ADMIN_USERNAME;
    const passwordMatches = validUsername
      ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
      : false;

    // Always run bcrypt.compare-shaped work even on bad username to avoid
    // leaking which field was wrong via response timing.
    if (!validUsername) {
      await bcrypt.compare(password, "$2a$10$invalidsaltinvalidsaltinvalidsaltO");
    }

    if (!validUsername || !passwordMatches) {
      return res.status(401).json({ success: false, message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed.", error: err.message });
  }
};

// GET /api/auth/verify — lets the frontend check if a stored token is still valid
const verify = (req, res) => {
  res.status(200).json({ success: true, admin: req.admin });
};

module.exports = { login, verify };