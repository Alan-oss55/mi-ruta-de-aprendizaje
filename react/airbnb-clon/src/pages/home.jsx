import { places } from "../data/places";
import PlaceCard from "../components/PlaceCard";
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");

  const filteredPlaces = places.filter(
    (place) =>
      place.city.toLowerCase().includes(search.toLowerCase()) ||
      place.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h2>Alojamientos disponibles</h2>

      <input
        type="text"
        placeholder="Buscar por ciudad o nombre...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: "20px" }}>
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}

export default Home;
