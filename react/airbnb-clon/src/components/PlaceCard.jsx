function PlaceCard( {place}){

    return(
        <div style={{border: "1px solid #ccc", padding: "10px", marginBottom:"10px"}}>

            <h3>{place.title}</h3>
            <p>Ciudad : {place.city}</p>
            <p>Precio : {place.price}</p>
            <button>Ver detalle</button>
        </div>
    )

}

export default PlaceCard;