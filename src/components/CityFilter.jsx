import { useAtom, useAtomValue } from "jotai";
import { cityAtom, listingsAtom } from "../app/atoms";
import { useEffect, useState } from "react";
import { buildRequestOptions } from "../app/api";
import CitySelection from "./CitySelection";

const CityFilter = () => {
  const [city_id, setCity_id] = useAtom(cityAtom);
  const [requestOptions, setRequestOptions] = useState(
    buildRequestOptions("listings", "index")
  );
  const [, setListings] = useAtom(listingsAtom);

  // Selection de la ville
  const selectCity = (e) => {
    setCity_id(parseInt(e.target.value));
  };

  // Options de la requête
  useEffect(() => {
    const endpoint = city_id ? "index_per_city" : "index";
    setRequestOptions(
      buildRequestOptions("listings", endpoint, { id: city_id })
    );
  }, [city_id]);

  // Exécution de la requête
  useEffect(() => {
    fetch(requestOptions.url, requestOptions.options)
      .then((response) => response.json())
      .then((response) => setListings(response))
      .catch((err) => console.error(err));
  }, [requestOptions]);

  return <CitySelection onChange={selectCity} />;
};

export default CityFilter;
