import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import ListingCard from "../components/ListingCard";
import CitySelection from "../components/CitySelection";

export default function ListingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [listing, setListing] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false); // État pour contrôler l'affichage du formulaire
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const { url, options } = buildRequestOptions("listings", "show", { id });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setListing(response);
        setFormData({
          title: response.title,
          description: response.description,
          price: response.price,
          address: response.address,
          photo_url: response.photo_url,
          city_id: response.city_id

        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleEdit =  () => {
    setIsEditing(true); // Afficher le formulaire de modification
  };


  const handleDelete = async () => {
    const { url, options } = buildRequestOptions("listings", "delete", { id, token: user.token });
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Delete request failed with status ${response.status}`);
      }
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Create a new FormData object to nest under "listing"
    const nestedFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      nestedFormData.append(`listing[${key}]`, value);
    }

    const { url, options } = buildRequestOptions("listings", "update", {
      id: listing.id,
      body: nestedFormData,
      token: user.token,
      isFormData: true,
    });
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        //throw new Error(`Update request failed with status ${response.status}`);
      }
      const updatedListing = await response.json();
      setListing(updatedListing);
      setIsEditing(false); // Masquer le formulaire de modification après la soumission
    } catch (error) {
      console.error('Error updating listing:', error);
    }
    // const { url, options } = buildRequestOptions("listings", "update", { id, body: formData, token: user.token });
    // try {
      //   const response = await fetch(url, options);
      //   if (!response.ok) {
        //     throw new Error(`Update request failed with status ${response.status}`);
        //   }
        //   const updatedListing = await response.json();
        //   setListing(updatedListing);
        //setIsEditing(false); // Masquer le formulaire de modification après la soumission
        // } catch (error) {
          //   console.error('Error updating listing:', error);
          // }
        };
        // console.log(listing);

  const isCurrentUser = user.email === listing?.user_email;

  return (
    <section>
      {listing && (
        <>
          <ListingCard listing={listing} preview={false} />
          {isCurrentUser && (
            <div>
              <button onClick={handleEdit}>Modifier</button>
              <button onClick={handleDelete}>Supprimer</button>
            </div>
          )}
          {isEditing && (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
    <input type="text" placeholder="Title" id="title" name="title" onChange={handleFormChange} value={formData.title} required />
    <input
      type="text"
      placeholder="Address"
      id="address"
      name="address"
      onChange={handleFormChange}
      value={formData.address}
      required
    />
    <textarea
      placeholder="Description"
      id="description"
      name="description"
      onChange={handleFormChange}
      value={formData.description}
      required
    ></textarea>
    <input
      type="number"
      placeholder="Price"
      id="price"
      name="price"
      min="0"
      onChange={handleFormChange}
      value={formData.price}
      required
    />
    <CitySelection onChange={handleFormChange} value={formData.city_id}/>
    <input type="file" id="photo" name="photo" accept="image/*" 
   onChange={handleFormChange} />

              <button type="submit">Enregistrer les modifications</button>
              <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
            </form>

          )}
        </>
      )}
    </section>
  );
}
