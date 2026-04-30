// server.js
// Entry point for the Express API.

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB = require("./db");
const authRoutes = require("./authRoutes");
const tutorialRoutes = require("./tutorialRoutes");
const { notFound, errorHandler } = require("./errorMiddleware");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = (process.env.CLIENT_URL || "http://127.0.0.1:5500,http://localhost:5500")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// API root - serve JSON for API requests
app.get("/api", (_req, res) => {
  res.json({ message: "Tech Tutorials Hub API is running." });
});

// Root route - serve the frontend in production
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/tutorials", tutorialRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const missingEnv = ["MONGO_URI", "JWT_SECRET"].filter((name) => !process.env[name]);
    if (missingEnv.length) {
      throw new Error(
        `${missingEnv.join(", ")} ${missingEnv.length === 1 ? "is" : "are"} required. ` +
          "Copy .env.example to .env and fill in the missing values."
      );
    }

    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Stop the other server or set a different PORT.`);
        process.exit(1);
      }

      throw err;
    });
  } catch (err) {
    console.error(`Server startup failed: ${err.message}`);
    process.exit(1);
  }
};

startServer();
