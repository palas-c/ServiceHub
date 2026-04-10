const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");

// 🔐 Generate token
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// 🚀 SIGNUP (MongoDB)
const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409);
    throw new Error("Email already in use");
  }

  // Create user in MongoDB
  const user = await User.create({
    name,
    email,
    password,
    role: role || "customer",
    phone: phone || "",
  });

  // 🔥 IMPORTANT: use _id
  const token = signToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    },
  });
});

// 🔐 LOGIN (MongoDB + hashed password)
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  // 🔥 include password
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // 🔥 IMPORTANT: use _id
  const token = signToken(user._id);

  res.status(200).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    },
  });
});

// 👤 GET ME (uses middleware user)
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = { signup, login, getMe };