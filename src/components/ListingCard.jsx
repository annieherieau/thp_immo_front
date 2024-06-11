import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ListingCard({ listing, preview = true }) {
  return (
    <div>
      <h4>{listing.title}</h4>
      <p>{listing.description}</p>
      <p>{listing.price} €</p>
      {listing.photo_url && (
        <div>
          <img src={listing.photo_url} alt={listing.title} style={{ maxWidth: '200px', height: 'auto' }} />
        </div>
      )}
      {/* {listing.user_email && !preview && (<p>{listing.user_email}</p>)} */}
      <div>
        {preview && <Link to={`/listing/${listing.id}`}>Voir le listing</Link>}
      </div>
    </div>
  );
}

ListingCard.propTypes = {
  listing: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    photo_url: PropTypes.string,  // Added photo_url to PropTypes
  }).isRequired,
  preview: PropTypes.bool,
};

