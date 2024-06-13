import ListingsIndex from "../components/ListingsIndex";
import Hero from "../components/Hero";
import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box textAlign="center" my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          La Marketplace de l&apos;immo
        </Typography>
      </Box>
      <Hero />
      <Box textAlign="center" my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Liste des biens immobiliers
        </Typography>
      </Box>
      <ListingsIndex />
    </Container>
  );
}
