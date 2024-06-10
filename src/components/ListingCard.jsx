import { Link } from "react-router-dom";

export default function ListingCard({ listingData, preview = true }) {
  const {listing, user_email} = listingData
  return (
    <div>
      <h4>{listing.title}</h4>
      <p>{listing.description}</p>
      <p>{listing.price} €</p>
      {user_email && (<p>{user_email}</p>)}
      <div>
        {preview && <Link to={`/listing/${listing.id}`}>Voir l'annonce</Link>}
      </div>
    </div>
  );
}
