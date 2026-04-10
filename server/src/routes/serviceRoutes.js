const express = require("express");
const { createService, getServices } = require("../controllers/serviceController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/", getServices);
router.post("/", protect, authorize("vendor"), createService);

module.exports = router;
