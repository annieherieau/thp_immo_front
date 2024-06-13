import { useAtomValue } from "jotai";
import { cityAtom, userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import CitySelection from "./CitySelection";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Container,
  Paper,
} from "@mui/material";

const ListingForm = ({ onSuccess }) => {
  const user = useAtomValue(userAtom);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);

    // Create a new FormData object to nest under "listing"
    const nestedFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      nestedFormData.append(`listing[${key}]`, value);
    }

    const { url, options } = buildRequestOptions("listings", "create", {
      body: nestedFormData,
      token: user.token,
      isFormData: true,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      alert("Listing created successfully");
      console.log("Listing created:", data);
    } catch (error) {
      setError(`Error creating listing: ${error}`);
      console.error("Error creating listing:", error);
    }
    onSuccess();
    e.target.reset();
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Listing
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Title"
            id="title"
            name="title"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Address"
            id="address"
            name="address"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Description"
            id="description"
            name="description"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Price"
            id="price"
            name="price"
            type="number"
            min="0"
            required
          />
          <CitySelection value={useAtomValue(cityAtom)} />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Surface Area (m²)"
            id="surface_area"
            name="surface_area"
            type="number"
            min="0"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Number of Rooms"
            id="number_of_rooms"
            name="number_of_rooms"
            type="number"
            min="0"
            required
          />
          <TextField
            select
            fullWidth
            margin="normal"
            variant="outlined"
            label="Furnished"
            id="furnished"
            name="furnished"
            required
          >
            <MenuItem value={true}>Furnished</MenuItem>
            <MenuItem value={false}>Not Furnished</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Bonus"
            id="bonus"
            name="bonus"
            multiline
            rows={2}
          />
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            style={{ marginTop: "16px", marginBottom: "16px" }}
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Create Listing
            </Button>
          </Box>
          {error && (
            <Typography color="error" style={{ marginTop: "16px" }}>
              {error}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default ListingForm;
