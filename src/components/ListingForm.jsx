import { useAtomValue } from "jotai";
import {  userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import { getFormData } from '../app/utils';


const ListingForm = () => {
  const user = useAtomValue(userAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    formData.append("user_id", user.id);
  
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
      console.log('Listing created:', data);
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        placeholder="Title"


        id = "title"
        name='title'
        required
      />
            {/* <input
        type="hidden"
        value= {user.id}
        id = "user_id"
        name='user_id'
        required
      /> */}
      <input
        type="text"
        placeholder="Address"


        id = "address"
        name='address'
        required
      />
      <textarea
        placeholder="Description"


        id = "description"
        name='description'
        required
      ></textarea>
      <input
        type="number"
        placeholder="Price"


        id = "price"
        name='price'
        required
      />
            <input
        type="number"
        placeholder="City"


        id = "city_id"
        name='city_id'
        required
      />
       <input
        type="file"
        id="photo"
        name="photo"
        accept="image/*"
      />
      <button type="submit">Create Listing</button>
    </form>
  );
};

export default ListingForm;
