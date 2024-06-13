import ListingCard from "./ListingCard";
import { useAtomValue } from "jotai";
import { listingsAtom } from "../app/atoms";
import { Container, Typography, Grid, Box } from "@mui/material";

export default function ListingsIndex() {
  const listings = useAtomValue(listingsAtom);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        {listings && listings.length === 0 && (
          <Typography variant="h6" color="textSecondary" align="center">
            Aucune annonce pour cette ville
          </Typography>
        )}
        {listings && listings.length > 0 && (
          <Grid container spacing={4}>
            {listings.map((listing) => (
              <Grid item xs={12} sm={6} md={4} key={listing.id}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
