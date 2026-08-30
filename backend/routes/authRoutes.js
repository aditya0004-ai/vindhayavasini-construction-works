const express = require("express");
const rateLimit = require("express-rate-limit");
const { login, verify } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Slow down brute-force attempts on the login endpoint
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: "Too many login attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, login);
router.get("/verify", protect, verify);

module.exports = router;