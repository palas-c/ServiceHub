const Booking = require("../models/Booking");
const Service = require("../models/Service");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

const createBooking = asyncHandler(async (req, res) => {
  const { vendorId, serviceId, scheduledAt, address, notes } = req.body;

  if (!vendorId || !serviceId || !scheduledAt || !address) {
    res.status(400);
    throw new Error("vendorId, serviceId, scheduledAt, and address are required");
  }

  const vendor = await User.findById(vendorId);
  if (!vendor || vendor.role !== "vendor") {
    res.status(404);
    throw new Error("Vendor not found");
  }

  const service = await Service.findById(serviceId);
  if (!service || String(service.vendor) !== String(vendorId)) {
    res.status(404);
    throw new Error("Service not found for selected vendor");
  }

  const booking = await Booking.create({
    customer: req.user._id,
    vendor: vendorId,
    service: serviceId,
    scheduledAt: new Date(scheduledAt),
    address,
    notes: notes || "",
    totalAmount: service.price,
  });

  res.status(201).json({
    success: true,
    booking,
  });
});

const getMyBookings = asyncHandler(async (req, res) => {
  const query = req.user.role === "vendor" ? { vendor: req.user._id } : { customer: req.user._id };

  const bookings = await Booking.find(query)
    .populate("customer", "name email phone")
    .populate("vendor", "name email phone")
    .populate("service", "title category price")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    bookings,
  });
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowedStatuses = ["accepted", "rejected", "completed", "cancelled"];

  if (!allowedStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid status value");
  }

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (String(booking.vendor) !== String(req.user._id)) {
    res.status(403);
    throw new Error("You can only update your own bookings");
  }

  booking.status = status;
  await booking.save();

  res.status(200).json({
    success: true,
    booking,
  });
});

module.exports = { createBooking, getMyBookings, updateBookingStatus };
