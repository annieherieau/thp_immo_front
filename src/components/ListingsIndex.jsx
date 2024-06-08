import { useState } from "react"
import { buildRequestOptions } from "../app/api";

export default function ListingsIndex(){
  const [listings, setListings] = useState({});

  const {url, options} = buildRequestOptions('listings', 'index' )
  console.log(url);
  console.log(options);
  
  return (
    <section>
      <h2>Liste des biens immobiliers</h2>

    </section>
  )
}