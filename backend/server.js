require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const jobRoutes = require("./routes/jobRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");

const app = express();
app.set("trust proxy", 1);
/* ================================
   DATABASE CONNECTION
================================ */

connectDB();

/* ================================
   CORS CONFIGURATION
================================ */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin
      // Example: Postman, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,
  })
);

/* ================================
   BODY PARSERS
================================ */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* ================================
   ROOT ROUTE
================================ */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is running successfully.",
  });
});

/* ================================
   HEALTH CHECK
================================ */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running.",
    environment: process.env.NODE_ENV || "development",
  });
});

/* ================================
   API ROUTES
================================ */

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/inquiries", inquiryRoutes);

/* ================================
   404 ROUTE HANDLER
================================ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

/* ================================
   CENTRAL ERROR HANDLER
================================ */

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,

    message:
      process.env.NODE_ENV === "production"
        ? err.message || "Something went wrong."
        : err.message || "Something went wrong on the server.",
  });
});

/* ================================
   SERVER
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`
=================================
🚀 Server is running
🌍 Environment: ${process.env.NODE_ENV || "development"}
🔌 Port: ${PORT}
=================================
  `);
});