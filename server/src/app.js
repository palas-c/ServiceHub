const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");

const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const withdrawalRoutes = require("./routes/withdrawalRoutes");
const adminRoutes = require("./routes/adminRoutes");

const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// =====================
// 🔐 SECURITY HEADERS
// =====================
app.use(helmet());

// =====================
// 🚫 RATE LIMITING
// =====================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api", limiter);

// =====================
// 🛡️ DATA SANITIZATION
// =====================
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// =====================
// 🔐 CORS (FIXED)
// =====================
app.use(
  cors({
    origin: [
      process.env.CLIENT_ORIGIN,
      "https://service-hub-eosin-three.vercel.app",
    ],
    credentials: true,
  })
);

// =====================
// 🔥 TRUST PROXY (IMPORTANT)
// =====================
app.set("trust proxy", 1);

// =====================
// 🔐 SESSION ()
// =====================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "10538be78e1cee275f4edad3382f047c",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // 🔥 important for Render
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// =====================
// 🔐 PASSPORT
// =====================
app.use(passport.initialize());
app.use(passport.session());

// =====================
// BODY PARSER
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// LOGGER
// =====================
app.use(morgan("dev"));

// =====================
// HEALTH CHECK
// =====================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ServiceHub API is running",
  });
});

// =====================
// ROUTES
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/withdrawals", withdrawalRoutes);
app.use("/api/admin", adminRoutes);

// =====================
// ERROR HANDLING
// =====================
app.use(notFound);
app.use(errorHandler);

module.exports = app;