import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";

export default function ListingCard({ listing, preview = true }) {
  const isLoggedIn = useAtomValue(isAuthAtom);
  
  return (
    <div style={styles.card}>
      <h4>{listing.title}</h4>
      <p><strong>Description:</strong> {listing.description}</p>
      <p><strong>Prix:</strong> {listing.price} €</p>
      <p><strong>Ville:</strong> {listing.city_name}</p>
      <p><strong>Superficie:</strong> {listing.surface_area} m²</p>
      <p><strong>Nombre de pièces:</strong> {listing.number_of_rooms}</p>
      <p><strong>Meublé:</strong> {listing.furnished ? "Oui" : "Non"}</p>
      {listing.bonus && <p><strong>Bonus:</strong> {listing.bonus}</p>}
      {isLoggedIn && (
        <p>
          <strong>Contact :</strong> 
          <a href={`mailto:${listing.user_email}`} target="_blank" rel="noopener noreferrer">
            {listing.user_email}
          </a>
        </p>
      )}
      {listing.photo_url && (
        <div style={styles.imageContainer}>
          <img src={listing.photo_url} alt={listing.title} style={styles.image} />
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
    city_name: PropTypes.string,
    user_email: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number,
    photo_url: PropTypes.string,
    surface_area: PropTypes.number, // Added surface_area to PropTypes
    number_of_rooms: PropTypes.number, // Added number_of_rooms to PropTypes
    furnished: PropTypes.bool, // Added furnished to PropTypes
    bonus: PropTypes.string, // Added bonus to PropTypes
  }).isRequired,
  preview: PropTypes.bool,
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px 0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    backgroundColor: "#fff",
  },
  imageContainer: {
    textAlign: "center",
    margin: "16px 0",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
  },
};
