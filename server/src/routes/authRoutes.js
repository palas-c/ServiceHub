const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  signup,
  login,
  getMe,
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");

const router = express.Router();

// =====================
// NORMAL AUTH
// =====================
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);

// =====================
// GOOGLE AUTH
// =====================
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(
      `${process.env.CLIENT_ORIGIN}/oauth-success?token=${token}`
    );
  }
);

module.exports = router;