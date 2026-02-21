import { useNavigate } from "react-router-dom";

function PlaceCard({ place }) {
    const navigate = useNavigate();

    function goToDetail() {
        navigate(`place/${place.id}`);
    }
    return (
        <div
            className="overflow-hidden rounded-xl border border-gray-200
        
            bg-white p-3 shadow-sm transition hover: -translate-y-1 hover:shadow-md"
        >
            <img
                src={place.image}
                alt={place.title}
                className="w-full h-40 object-cover rounded-md"
            />

            <h3 className="mt-2 text-lg font-semibold">{place.title}</h3>
            <p className="text-gray-600">Ciudad : {place.city}</p>
            <p className="mt-1 font-bold">Precio : {place.price}</p>

            <button
                className="mt-3 cursor-pointer w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800"
                onClick={goToDetail}
            >
                Ver detalle
            </button>
        </div>
    );
}

export default PlaceCard;
