import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔥 SEARCH FUNCTION
  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/vendors?search=${search}`);
  };

  // 🔥 CATEGORY CLICK
  const handleCategory = (category) => {
    navigate(`/vendors?category=${category}`);
  };

  return (
    <MainLayout>

      {/* HERO */}
      <div className="relative rounded-3xl overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="home"
          className="w-full h-[350px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">

          <h1 className="text-4xl font-bold mb-4">
            Find Trusted Services Near You
          </h1>

          <p className="mb-6">
            Book verified professionals for your home services instantly.
          </p>

          <div className="flex bg-white rounded-xl overflow-hidden w-full max-w-lg">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search services..."
              className="flex-1 p-3 text-black outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-teal-600 text-white px-6"
            >
              Search
            </button>
          </div>

        </div>
      </div>

      {/* CATEGORIES */}
      <h2 className="text-2xl font-semibold mb-6">
        Popular Categories
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {/* CLEANING */}
        <div
          onClick={() => handleCategory("cleaning")}
          className="bg-white rounded-2xl shadow cursor-pointer hover:scale-105 transition"
        >
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
            className="h-40 w-full object-cover rounded-t-2xl"
          />
          <p className="text-center p-4 font-medium">Cleaning</p>
        </div>

        {/* PLUMBING */}
        <div
          onClick={() => handleCategory("plumbing")}
          className="bg-white rounded-2xl shadow cursor-pointer hover:scale-105 transition"
        >
          <img
            src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7"
            className="h-40 w-full object-cover rounded-t-2xl"
          />
          <p className="text-center p-4 font-medium">Plumbing</p>
        </div>

        {/* ELECTRICIAN */}
        <div
          onClick={() => handleCategory("electrician")}
          className="bg-white rounded-2xl shadow cursor-pointer hover:scale-105 transition"
        >
          <img
            src="https://images.unsplash.com/photo-1581092335397-9583eb92d232"
            className="h-40 w-full object-cover rounded-t-2xl"
          />
          <p className="text-center p-4 font-medium">Electrician</p>
        </div>

        {/* PAINTING */}
        <div
          onClick={() => handleCategory("painting")}
          className="bg-white rounded-2xl shadow cursor-pointer hover:scale-105 transition"
        >
          <img
            src="https://images.unsplash.com/photo-1562259949-e8e7689d7828"
            className="h-40 w-full object-cover rounded-t-2xl"
          />
          <p className="text-center p-4 font-medium">Painting</p>
        </div>

      </div>

    </MainLayout>
  );
}

export default Home;