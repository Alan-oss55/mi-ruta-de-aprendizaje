import { places } from "../data/places";
import { useParams } from "react-router-dom";

function PlaceDetail(){

    const {id} = useParams();

    const place = places.find( (p) => p.id == Number(id) );

    if( !place ){
        return( <h1>Lugar no encontrado</h1>)
    }

    return(
        <div>

            <img src={place.image} alt={place.title} style={{ width: "100%", height: "600px", objectFit:"cover"}} />
            <h2>{place.title}</h2>
            <p>Ciudad: {place.city}</p>
            <p>Precio: {place.price}</p>
            <p>Este es el detalle del alojamiento</p>
        </div>
    )
}

export default PlaceDetail;