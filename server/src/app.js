const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan("dev"));

// 👇 ADD HERE (DEBUG)
app.use((req, res, next) => {
  console.log("ROUTE HIT:", req.method, req.url);
  next();
});


// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ServiceHub API is running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;