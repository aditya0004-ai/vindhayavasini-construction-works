const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================================
   POST /api/auth/login
========================================= */

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    /* ================================
       VALIDATE INPUT
    ================================ */

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    /* ================================
       CHECK ENV VARIABLES
    ================================ */

    if (
      !process.env.ADMIN_USERNAME ||
      !process.env.ADMIN_PASSWORD_HASH ||
      !process.env.JWT_SECRET
    ) {
      console.error(
        "Missing ADMIN_USERNAME, ADMIN_PASSWORD_HASH, or JWT_SECRET"
      );

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error.",
      });
    }

    /* ================================
       VERIFY USERNAME
    ================================ */

    const validUsername =
      username === process.env.ADMIN_USERNAME;

    /* ================================
       VERIFY PASSWORD
    ================================ */

    const passwordMatches = validUsername
      ? await bcrypt.compare(
          password,
          process.env.ADMIN_PASSWORD_HASH
        )
      : false;
      console.log("ADMIN LOGIN DEBUG:", {
  receivedUsername: username,
  expectedUsername: process.env.ADMIN_USERNAME,
  usernameMatch: username === process.env.ADMIN_USERNAME,
  passwordMatch: passwordMatches,
  hasPasswordHash: !!process.env.ADMIN_PASSWORD_HASH,
});

    /* ================================
       INVALID LOGIN
    ================================ */

    if (!validUsername || !passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    /* ================================
       GENERATE JWT
    ================================ */

    const expiresIn =
      process.env.JWT_EXPIRES_IN || "30d";

    const token = jwt.sign(
      {
        username: process.env.ADMIN_USERNAME,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn,
      }
    );

    /* ================================
       SUCCESS RESPONSE
    ================================ */

    return res.status(200).json({
      success: true,
      token,
      expiresIn,
    });

  } catch (err) {
    console.error(
      "Login Error:",
      err.message
    );

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};


/* =========================================
   GET /api/auth/verify
========================================= */

const verify = (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin,
  });
};


module.exports = {
  login,
  verify,
};