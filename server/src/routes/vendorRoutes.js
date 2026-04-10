const express = require("express");
const router = express.Router();

console.log("🔥 FILTER API ACTIVE");

// 🔥 GET VENDORS WITH FILTERS
router.get("/", (req, res) => {
  let vendors = [
    {
      id: "1",
      name: "Doremon Cleaning Service",
      rating: 4.8,
      price: 500,
      available: true,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    },
    {
      id: "2",
      name: "Electrician Pro",
      rating: 4.6,
      price: 1200,
      available: true,
      image:
        "https://images.unsplash.com/photo-1581092335397-9583eb92d232",
    },
    {
      id: "3",
      name: "Painter Rangers",
      rating: 4.7,
      price: 1800,
      available: false,
      image:
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
    },
  ];

  const { maxPrice, minRating, available, search, category } = req.query;

  // 🔥 APPLY FILTERS
  if (maxPrice) {
    vendors = vendors.filter((v) => v.price <= Number(maxPrice));
  }

  if (minRating) {
    vendors = vendors.filter((v) => v.rating >= Number(minRating));
  }

  if (available === "true") {
    vendors = vendors.filter((v) => v.available === true);
  }

  if (search) {
    vendors = vendors.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    vendors = vendors.filter((v) =>
      v.name.toLowerCase().includes(category.toLowerCase())
    );
  }

  res.json({
    success: true,
    vendors,
  });
});

module.exports = router;