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
      {/* {loading ? (
        <p>Loading...</p>
      ) : listings.length === 0 ? (
        <p>Vous n&apos;avez aucune annonce.</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <li key={listing.id}>
              <h2>{listing.title}</h2>
              {listing.photo_url && (
                <img
                  src={listing.photo_url}
                  alt={listing.title}
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              )}
            </li>
          ))}
        </ul>
      )} */}
      {listings && listings.length == 0 && (
        <p>Aucune annonce pour cette ville</p>
      )}
      {listings &&
        listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
    </>
  );
}
