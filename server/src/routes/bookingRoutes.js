const express = require("express");
const {
  createBooking,
  getMyBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize("customer"), createBooking);
router.get("/me", protect, getMyBookings);
router.patch("/:id/status", protect, authorize("vendor"), updateBookingStatus);

module.exports = router;
