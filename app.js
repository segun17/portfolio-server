require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const authRoutes = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const emailRoutes = require('./src/routes/emailRoutes');
const seedProjects = require('./src/utils/seedProjects');

 const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

// Logging
app.use(morgan(process.env.MORGAN_FORMAT || "dev"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX || 100),
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
    app.use('/api/admin', authRoutes);
    app.use('/api/projects', projectRoutes);
    app.use('/api', emailRoutes);

    
    // Seed database (comment out after first run)
    // seedProjects(); 

app.get("/", (req, res) => {
  res.send("Hello there 👋");
});

app.get("/api/echo", (req, res) => {
  res.json({
    message: "echo",
    query: req.query,
    cookies: req.cookies,
  });
});

module.exports = app;
