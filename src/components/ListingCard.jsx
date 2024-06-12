import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";

export default function ListingCard({ listing, preview = true }) {
  const isLoggedIn = useAtomValue(isAuthAtom);
  return (
    <div>
      <h4>{listing.title}</h4>
      <p>{listing.description}</p>
      <p>{listing.price} €</p>
      <p>Ville: {listing.city_name}</p>
      {isLoggedIn && (<p>Contact : <a href={`mailto:${listing.user_email}`} target="_blank">{listing.user_email}</a></p>)}
      {listing.photo_url && (
        <div>
          <img src={listing.photo_url} alt={listing.title} style={{ maxWidth: '200px', height: 'auto' }} />
        </div>
      )}
      <div>
        {preview && <Link to={`/listing/${listing.id}`}>Voir le listing</Link>}
      </div>
    </div>
  );
}

ListingCard.propTypes = {
  listing: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number,
    photo_url: PropTypes.string,  // Added photo_url to PropTypes
  }).isRequired,
  preview: PropTypes.bool,
};

