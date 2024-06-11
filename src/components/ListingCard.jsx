import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCityName, getUserEmail } from "../app/utils";
import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";

export default function ListingCard({ listing, preview = true }) {
  const isLoggedIn = useAtomValue(isAuthAtom);
  const cityName = getCityName(listing.city_id);
  const userEmail = getUserEmail(listing.user_id);
  return (
    <div>
      <h4>{listing.title}</h4>
      <p>{listing.description}</p>
      <p>{listing.price} €</p>
      <p>Ville: {cityName}</p>
      {isLoggedIn && userEmail && !preview && (<p>Contacter : <a href={`mailto:${userEmail}`} target="_blank">{userEmail}</a></p>)}
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
