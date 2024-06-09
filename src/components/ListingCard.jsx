import { Link } from "react-router-dom";

export default function ListingCard({listing, preview=true}){
  return(
    <div>
      <h4>{listing.title}</h4>
      <p>{listing.description}</p>
      <p>{listing.price} €</p>
      <div>
       {preview && (<Link to={`/listing/${listing.id}`}>Voir l'annonce</Link>)}
      </div>
    </div>
  )
}