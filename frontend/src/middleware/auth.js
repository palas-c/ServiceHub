const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 PROTECT ROUTE (CHECK LOGIN)
const protect = async (req, res, next) => {
  try {
    let token;

    // 🔥 GET TOKEN FROM HEADER
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // 🔥 VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🔥 GET USER (WITHOUT PASSWORD)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// 🔐 ROLE BASED ACCESS
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  };
};

module.exports = { protect, authorize };