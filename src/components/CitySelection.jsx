import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { useEffect } from "react";

export default function CitySelection({ onChange }) {
  const [cities, setCities] = useState(undefined);
  const { url, options } = buildRequestOptions("cities", "index");
  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setCities(response))
      .catch((err) => console.error(err));
  }, [setCities]);

  return (
    <div>
      <label htmlFor="cities_list">Ville : </label>
      <select name="city_id" id="cities_list" onChange={onChange} required>
        <option defaultValue value=""> selectionnez une ville </option>
        {cities &&
          cities.map((city) => (
            <option key={city.id} value={city.id} name={city.id} id={city.id}>
              {city.name}
            </option>
          ))}
      </select>
    </div>
  );
}
