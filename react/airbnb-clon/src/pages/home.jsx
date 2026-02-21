import { places } from "../data/places";
import PlaceCard from "../components/PlaceCard";
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredPlaces = places.filter((place) => {
    const matchesText =
      place.city.toLowerCase().includes(search.toLowerCase()) ||
      place.title.toLowerCase().includes(search.toLowerCase());

    const matchesMin = minPrice === "" || place.price >= Number(minPrice);

    const matchesMax = maxPrice === "" || place.price <= Number(maxPrice);

    return matchesText && matchesMin && matchesMax;
  });

  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Alojamientos disponibles</h2>

      <input
        type="text"
        placeholder="Buscar por ciudad o nombre...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio mínimo"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <input
        type="number"
        placeholder="Precio máximo"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
         
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </main>
  );
}

export default Home;
