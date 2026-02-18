import { useNavigate } from "react-router-dom";

function PlaceCard( {place}){

    const navigate = useNavigate();

    function goToDetail(){
        navigate(`place/${place.id}`) 
    }
    return(
        <div style={{border: "1px solid #ccc", padding: "10px", marginBottom:"10px"}} >

            <img src={place.image} alt={place.title} style={{ width:"100%", height:"400px", objectFit:"cover"}} />

            <h3>{place.title}</h3>
            <p>Ciudad : {place.city}</p>
            <p>Precio : {place.price}</p>

            <button onClick={goToDetail}>Ver detalle</button>
                
        </div>
    )

}

export default PlaceCard;