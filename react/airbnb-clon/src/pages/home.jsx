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
    <div>
      <h2>Alojamientos disponibles</h2>

      <input type="text" placeholder="Buscar por ciudad o nombre...." value={search} onChange={(e) => setSearch(e.target.value)} />

      <input type="number" placeholder="Precio mínimo" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={{ marginLeft: "10px" }} />

      <input type="number" placeholder="Precio máximo" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ marginLeft: "10px" }} />

      <div style={{ marginTop: "20px" }}> {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}

export default Home;
