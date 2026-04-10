import { useState } from "react";

function Filters({ onChange }) {
  const [filters, setFilters] = useState({
    maxPrice: 300,
    minRating: 4,
    availability: "all",
  });

  const updateFilters = (nextState) => {
    setFilters(nextState);
    if (onChange) {
      onChange(nextState);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
      <h2 className="font-semibold text-lg mb-4">Filters</h2>

      <div className="mb-6">
        <p className="font-medium mb-2">Max Price: ${filters.maxPrice}</p>
        <input
          type="range"
          min="10"
          max="500"
          value={filters.maxPrice}
          onChange={(event) =>
            updateFilters({ ...filters, maxPrice: Number(event.target.value) })
          }
          className="w-full"
        />
      </div>

      <div className="mb-6">
        <p className="font-medium mb-2">Minimum Rating</p>
        <select
          className="w-full border rounded-lg p-2"
          value={filters.minRating}
          onChange={(event) =>
            updateFilters({ ...filters, minRating: Number(event.target.value) })
          }
        >
          <option value={4}>4 and above</option>
          <option value={3}>3 and above</option>
          <option value={2}>2 and above</option>
        </select>
      </div>

      <div>
        <p className="font-medium mb-2">Availability</p>
        <label className="block mb-1">
          <input
            type="radio"
            checked={filters.availability === "all"}
            onChange={() => updateFilters({ ...filters, availability: "all" })}
          />{" "}
          All
        </label>
        <label className="block">
          <input
            type="radio"
            checked={filters.availability === "today"}
            onChange={() => updateFilters({ ...filters, availability: "today" })}
          />{" "}
          Today
        </label>
      </div>
    </div>
  );
}

export default Filters;
