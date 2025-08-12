import React, { useState } from "react";
import vendors from "../api/vendors.json";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFiltered([]);
      return;
    }

    const results = vendors.filter((vendor) =>
      vendor.name.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(results);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search vendors..."
        className="w-full px-4 py-2  rounded-md focus:outline-none text-sm font-medium focus:ring-1 focus:ring-orange-400 bg-white"
      />

{filtered.length > 0 && (
  <ul className="absolute z-10 w-full mt-2 bg-gradient-to-b from-amber-100 to-white text-gray-800 text-sm font-medium rounded-md">
    {filtered.map((vendor) => (
<li
  key={vendor.id}
  className="transition-all duration-200 ease-in-out hover:bg-amber-100 hover:scale-[1.02] rounded-md"
>
  <Link to={`/vendors/${vendor.id}`} className="block px-4 py-2 w-full">
    {vendor.name}
  </Link>
</li>

    ))}
  </ul>
)}

    </div>
  );
}
