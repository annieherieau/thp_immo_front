import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function ListingCard({ listing, preview = true }) {
  const isLoggedIn = useAtomValue(isAuthAtom);

  return (
    <Card sx={{ maxWidth: 345, margin: "20px auto" }}>
      {listing.photo_url && (
        <CardMedia
          component="img"
          height="140"
          image={listing.photo_url}
          alt={listing.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {listing.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {listing.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Prix: {listing.price} €
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ville: {listing.city_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Adresse: {listing.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Surface: {listing.surface_area} m²
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Nombre de pièces: {listing.number_of_rooms}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Meublé: {listing.furnished ? 'Oui' : 'Non'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bonus: {listing.bonus}
        </Typography>
        {isLoggedIn && (
          <Typography variant="body2" color="text.secondary">
            Contact : <a href={`mailto:${listing.user_email}`} target="_blank" rel="noopener noreferrer">{listing.user_email}</a>
          </Typography>
        )}
        <Box mt={2}>
          {preview && (
            <Button variant="contained" color="primary" component={Link} to={`/listing/${listing.id}`}>
              Voir le listing
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

ListingCard.propTypes = {
  listing: PropTypes.shape({
    city_name: PropTypes.string.isRequired,
    user_email: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    photo_url: PropTypes.string, 
    address: PropTypes.string, 
    surface_area: PropTypes.number,
    number_of_rooms: PropTypes.number, 
    furnished: PropTypes.bool,  
    bonus: PropTypes.string, 
  }).isRequired,
  preview: PropTypes.bool,
};
