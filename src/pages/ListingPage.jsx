import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { buildRequestOptions } from "../app/api";
import ListingCard from "../components/ListingCard";

export default function ListingPage(){
  const {id} = useParams()
  const [listing, setListing] = useState(undefined);
  
  useEffect(() => {
    const { url, options } = buildRequestOptions("listings", "show", {id: id});
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setListing(response))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <section>
      {listing && <ListingCard listing={listing} preview={false} />}
    </section>
  )
}