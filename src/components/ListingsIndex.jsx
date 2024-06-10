import { useState, useEffect } from "react";
import { buildRequestOptions } from "../app/api";
import ListingCard from "./ListingCard";

export default function ListingsIndex() {
  const [listings, setListings] = useState(undefined);
  const { url, options } = buildRequestOptions("listings", "index");

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setListings(response))
      .catch((err) => console.error(err));
  }, [setListings]);
  return (
    <section>
      <h2>Liste des biens immobiliers</h2>
      {listings && listings.map(listingData=> <ListingCard key={listingData.listing.id} listingData={listingData}/>)}
    </section>
  );
}
