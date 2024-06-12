import { useState, useEffect, useMemo } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import ListingForm from "../components/ListingForm";
import ListingCard from "../components/ListingCard";

export default function Profile() {
  const user = useAtomValue(userAtom);
  const { token } = useAtomValue(userAtom);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(token);
  const requestOptions = useMemo(
    () => buildRequestOptions(null, "my_listings", { token }),
    [token]
  );

  useEffect(() => {
    const fetchAnnonces = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          requestOptions.url,
          requestOptions.options
        );
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, [requestOptions]);

  return (
    <>
      <h1>Profile {user.email}</h1>
      <ListingForm />
      <h1>Mes Annonces</h1>
      {loading && <p>Loading...</p>}
      {listings.length === 0 && <p>Vous n'avez aucune annonce.</p>}
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </>
  );
}
