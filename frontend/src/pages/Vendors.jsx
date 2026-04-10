import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import SkeletonCard from "../components/common/SkeletonCard";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FILTER STATES
  const [price, setPrice] = useState(2000);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState("all");

  // 🔥 SEARCH STATES
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryQuery = queryParams.get("category");

  // 🔥 DEBOUNCE SEARCH
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔥 UPDATE URL
  useEffect(() => {
    const params = new URLSearchParams();

    params.set("maxPrice", price);

    if (rating > 0) {
      params.set("minRating", rating);
    }

    if (availability === "today") {
      params.set("available", true);
    }

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    }

    if (categoryQuery) {
      params.set("category", categoryQuery);
    }

    navigate(`/vendors?${params.toString()}`, { replace: true });
  }, [price, rating, availability, debouncedSearch]);

  // 🔥 FETCH DATA
  const fetchVendors = async () => {
    try {
      setLoading(true);

      let url = `/vendors?maxPrice=${price}`;

      if (rating > 0) url += `&minRating=${rating}`;
      if (availability === "today") url += `&available=true`;
      if (debouncedSearch) url += `&search=${debouncedSearch}`;
      if (categoryQuery) url += `&category=${categoryQuery}`;

      const res = await API.get(url);

      setVendors(res.data.vendors);

    } catch (error) {
      console.log("Fallback triggered");

      setVendors([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 AUTO FETCH
  useEffect(() => {
    fetchVendors();
  }, [location.search]);

  // 🔥 RESET FILTERS
  const resetFilters = () => {
    setSearch("");
    navigate("/vendors");
  };

  return (
    <MainLayout>
      <div className="grid md:grid-cols-4 gap-8">

        {/* FILTER PANEL */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
          <h2 className="font-semibold text-lg mb-4">Filters</h2>

          {/* 🔍 SEARCH */}
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-3 rounded-lg mb-6"
          />

          {/* PRICE */}
          <div className="mb-6">
            <p>Max Price: ₹{price}</p>
            <input
              type="range"
              min="100"
              max="2000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* RATING */}
          <div className="mb-6">
            <p>Rating</p>

            <label className="block">
              <input
                type="radio"
                checked={rating === 4}
                onChange={() => setRating(4)}
              /> ⭐ 4+
            </label>

            <label className="block">
              <input
                type="radio"
                checked={rating === 3}
                onChange={() => setRating(3)}
              /> ⭐ 3+
            </label>

            <label className="block">
              <input
                type="radio"
                checked={rating === 0}
                onChange={() => setRating(0)}
              /> All
            </label>
          </div>

          {/* AVAILABILITY */}
          <div className="mb-6">
            <p>Availability</p>

            <label className="block">
              <input
                type="radio"
                checked={availability === "all"}
                onChange={() => setAvailability("all")}
              /> All
            </label>

            <label className="block">
              <input
                type="radio"
                checked={availability === "today"}
                onChange={() => setAvailability("today")}
              /> Today
            </label>
          </div>

          {/* RESET */}
          <button
            onClick={resetFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
          >
            Reset Filters
          </button>
        </div>

        {/* LIST */}
        <div className="md:col-span-3 space-y-6">

          <h1 className="text-2xl font-bold">
            Available Professionals
          </h1>

          {/* 🔥 SKELETON LOADING */}
          {loading &&
            [...Array(5)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}

          {/* EMPTY */}
          {!loading && vendors.length === 0 && (
            <div className="text-center bg-white p-10 rounded-2xl shadow">
              <p className="text-lg font-medium">
                No vendors found 😕
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 bg-teal-600 text-white px-5 py-2 rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* DATA */}
          {!loading &&
            vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white p-5 rounded-2xl shadow flex justify-between items-center hover:shadow-lg transition"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div>
                    <h2 className="font-bold">{vendor.name}</h2>
                    <p>⭐ {vendor.rating}</p>
                    <p>₹ {vendor.price}</p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate("/booking", { state: vendor })
                  }
                  disabled={!vendor.available}
                  className={`px-4 py-2 rounded-lg text-white ${
                    vendor.available
                      ? "bg-teal-600 hover:bg-teal-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Book
                </button>
              </div>
            ))}
        </div>

      </div>
    </MainLayout>
  );
}

export default Vendors;