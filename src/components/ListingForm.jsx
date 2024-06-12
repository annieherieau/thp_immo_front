import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import CitySelection from "./CitySelection";
import { useState } from "react";
import { getFormData } from "../app/utils";

const ListingForm = ({onSuccess}) => {
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
      alert("Listing created successfully")
      console.log("Listing created:", data);
    } catch (error) {
      setError(`Error creating listing:, ${error}`)
      console.error("Error creating listing:", error);
    }
    onSuccess();
    e.target.reset()
  };
  
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" placeholder="Title" id="title" name="title" required />
      <input
        type="text"
        placeholder="Address"
        id="address"
        name="address"
        required
      />
      <textarea
        placeholder="Description"
        id="description"
        name="description"
        required
      ></textarea>
      <input
        type="number"
        placeholder="Price"
        id="price"
        name="price"
        min="0"
        required
      />
      <CitySelection />
      <input type="file" id="photo" name="photo" accept="image/*" />
      <button type="submit">Create Listing</button>
    </form>
  );
};

export default ListingForm;
