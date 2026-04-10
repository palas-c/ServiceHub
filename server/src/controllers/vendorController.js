const VendorProfile = require("../models_unused/VendorProfile");
const User = require("../models_unused/User");
const asyncHandler = require("../middleware/asyncHandler");

const getVendors = asyncHandler(async (req, res) => {
  const { category, minRating, maxPrice, available } = req.query;
  const query = {};

  if (category) {
    query.category = new RegExp(category, "i");
  }
  if (minRating) {
    query.rating = { ...(query.rating || {}), $gte: Number(minRating) };
  }
  if (maxPrice) {
    query.basePrice = { ...(query.basePrice || {}), $lte: Number(maxPrice) };
  }
  if (available === "true" || available === "false") {
    query.isAvailable = available === "true";
  }

  const vendors = await VendorProfile.find(query)
    .populate("user", "name email phone")
    .sort({ rating: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: vendors.length,
    vendors,
  });
});

const getVendorById = asyncHandler(async (req, res) => {
  const vendorProfile = await VendorProfile.findById(req.params.id).populate(
    "user",
    "name email phone"
  );

  if (!vendorProfile) {
    res.status(404);
    throw new Error("Vendor profile not found");
  }

  res.status(200).json({
    success: true,
    vendor: vendorProfile,
  });
});

const upsertVendorProfile = asyncHandler(async (req, res) => {
  const { category, bio, experienceYears, basePrice, isAvailable } = req.body;

  if (!category) {
    res.status(400);
    throw new Error("Category is required");
  }

  const user = await User.findById(req.user._id);
  if (!user || user.role !== "vendor") {
    res.status(403);
    throw new Error("Only vendors can create profile");
  }

  const profile = await VendorProfile.findOneAndUpdate(
    { user: req.user._id },
    {
      user: req.user._id,
      category,
      bio: bio || "",
      experienceYears: Number(experienceYears || 0),
      basePrice: Number(basePrice || 0),
      ...(typeof isAvailable === "boolean" ? { isAvailable } : {}),
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).populate("user", "name email phone");

  res.status(200).json({
    success: true,
    vendor: profile,
  });
});

module.exports = { getVendors, getVendorById, upsertVendorProfile };
