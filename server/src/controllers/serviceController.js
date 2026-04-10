const Service = require("../models/Service");
const asyncHandler = require("../middleware/asyncHandler");

const createService = asyncHandler(async (req, res) => {
  const { title, description, category, price, durationMinutes } = req.body;

  if (!title || !category || price === undefined) {
    res.status(400);
    throw new Error("Title, category, and price are required");
  }

  const service = await Service.create({
    vendor: req.user._id,
    title,
    description: description || "",
    category,
    price: Number(price),
    durationMinutes: Number(durationMinutes || 60),
  });

  res.status(201).json({
    success: true,
    service,
  });
});

const getServices = asyncHandler(async (req, res) => {
  const { category, vendorId, maxPrice } = req.query;
  const query = { isActive: true };

  if (category) {
    query.category = new RegExp(category, "i");
  }
  if (vendorId) {
    query.vendor = vendorId;
  }
  if (maxPrice) {
    query.price = { $lte: Number(maxPrice) };
  }

  const services = await Service.find(query)
    .populate("vendor", "name email phone")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: services.length,
    services,
  });
});

module.exports = { createService, getServices };
