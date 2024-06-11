import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { useEffect } from "react";

export default function CityFilter(){
  const [cities, setCities] = useState(undefined);
  const { url, options } = buildRequestOptions("cities", "index");

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setCities(response))
      .catch((err) => console.error(err));
  }, [setCities]);
  return (
    <section>
      {cities && listings.map(cityData=> <li key={cityData.city.id} city={city}></li>)}
    </section>
  );
}