import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ListingCard({ listing, preview = true }) {
  return (
    <div>
      <h4>{listing.title}</h4>
      <p>{listing.description}</p>
      <p>{listing.price} €</p>
      {/* {listing.user_email && !preview && (<p>{user_email}</p>)} */}
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
  }).isRequired,
  preview: PropTypes.bool,
};
