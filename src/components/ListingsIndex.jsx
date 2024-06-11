import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import ListingCard from "./ListingCard";
import { useAtom, useAtomValue } from "jotai";
import { cityAtom, listingsAtom } from "../app/atoms";

export default function ListingsIndex() {
  const listings = useAtomValue(listingsAtom)
  const [requestOptions, setRequestOptions ] =useState(buildRequestOptions("listings", "index"))
  const [city_id, setCity_id] = useAtom(cityAtom);

  return (
    <section>
      {listings && listings.map(listing=> <ListingCard key={listing.id} listing={listing}/>)}
    </section>
  );
}
