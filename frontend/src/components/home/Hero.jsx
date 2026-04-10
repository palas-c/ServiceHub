import { useState } from "react";

function Hero({ title, subtitle, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div
      className="relative p-10 md:p-14 rounded-3xl text-white overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold">{title || "Find Trusted Services Near You"}</h1>
        <p className="text-base md:text-lg mt-3 mb-6">
          {subtitle || "Book verified professionals for your home services instantly."}
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl flex items-center p-2 shadow-md">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search services..."
            className="flex-1 p-3 outline-none text-gray-700 rounded-lg"
          />
          <button className="bg-teal-600 text-white px-6 py-3 rounded-xl">Search</button>
        </form>
      </div>
    </div>
  );
}

export default Hero;
