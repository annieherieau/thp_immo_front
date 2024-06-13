import { useAtomValue } from "jotai";
import { cityAtom, userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import CitySelection from "./CitySelection";
import { useState } from "react";

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
      onSuccess();
      e.target.reset();
    } catch (error) {
      setError(`Error creating listing: ${error}`);
      console.error("Error creating listing:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
      {error && <p style={styles.error}>{error}</p>}
      <input type="text" placeholder="Title" id="title" name="title" required style={styles.input} />
      <input type="text" placeholder="Address" id="address" name="address" required style={styles.input} />
      <textarea placeholder="Description" id="description" name="description" required style={styles.textarea}></textarea>
      <input type="number" placeholder="Price" id="price" name="price" min="0" required style={styles.input} />
      <input type="number" placeholder="Surface Area (m²)" id="surface_area" name="surface_area" min="0" required style={styles.input} />
      <input type="number" placeholder="Number of Rooms" id="number_of_rooms" name="number_of_rooms" min="0" required style={styles.input} />
      <label>
        Furnished:
        <input type="checkbox" id="furnished" name="furnished" style={styles.checkbox} />
      </label>
      <input type="text" placeholder="Bonus (e.g., Garden, Terrace)" id="bonus" name="bonus" style={styles.input} />
      <CitySelection value={useAtomValue(cityAtom)} />
      <input type="file" id="photo" name="photo" accept="image/*" style={styles.input} />
      <button type="submit" style={styles.button}>Create Listing</button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  checkbox: {
    marginLeft: "8px",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};

export default ListingForm;
