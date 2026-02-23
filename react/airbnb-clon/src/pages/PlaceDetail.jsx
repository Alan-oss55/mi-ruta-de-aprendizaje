import { places } from "../data/places";
import { useParams, useNavigate } from "react-router-dom";

function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const place = places.find((p) => p.id === Number(id));

  if (!place) {
    return (
      <main className="min-h-screen bg-gray-100 p-4">
        <div className="mx-auto max-w-3xl rounded-lg border bg-white p-6 text-center">
          <h1 className="text-2xl font-bold">Lugar no encontrado</h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Volver al inicio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white shadow-sm">
        <img
          src={place.image}
          alt={place.title}
          className="h-72 w-full rounded-t-xl object-cover md:h-96"
        />

        <div className="p-5">
          <h2 className="text-2xl font-bold">{place.title}</h2>
          <p className="mt-2 text-gray-600">Ciudad: {place.city}</p>
          <p className="mt-1 text-lg font-semibold">Precio: ${place.price} / noche</p>
          <p className="mt-4 text-gray-700">
            Este es el detalle del alojamiento. Aquí puedes mostrar descripción,
            servicios, ubicación y más info.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </div>
    </main>
  );
}

export default PlaceDetail;
