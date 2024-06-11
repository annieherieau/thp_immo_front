import ListingCard from "./ListingCard";
import { useAtomValue } from "jotai";
import { listingsAtom } from "../app/atoms";

export default function ListingsIndex() {
  const listings = useAtomValue(listingsAtom)

  return (
    <section>
      {listings && listings.length ==0 &&(<p>Aucune annonce pour cette ville</p>)}
      {listings && listings.map(listing=> <ListingCard key={listing.id} listing={listing}/>)}
    </section>
  );
}
