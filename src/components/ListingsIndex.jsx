import { useState, useEffect } from "react";
import { buildRequestOptions } from "../app/api";
import ListingCard from "./ListingCard";
import CityFilter from "./CityFilter";
import { useAtom } from "jotai";
import { cityAtom } from "../app/atoms";

export default function ListingsIndex() {
  const [listings, setListings] = useState(undefined);
  const [requestOptions, setRequestOptions ] =useState(buildRequestOptions("listings", "index"))
  const [city_id, setCity_id] = useAtom(cityAtom);
  
  const handleCity = (e)=>{
    setCity_id(parseInt(e.target.value))
  }

  // mis à jour des options de requete
  useEffect(()=>{
    const endpoint = city_id ? 'index_per_city' : 'index'
    setRequestOptions(buildRequestOptions('listings', endpoint, {id: city_id}))
  }, [city_id])

  // exécution de la requête
  useEffect(() => {
    fetch(requestOptions.url, requestOptions.options)
      .then((response) => response.json())
      .then((response) => setListings(response))
      .catch((err) => console.error(err));
  }, [requestOptions]);

  return (
    <section>
      <CityFilter onChange={handleCity}/>
      {listings && listings.map(listing=> <ListingCard key={listing.id} listing={listing}/>)}
    </section>
  );
}
