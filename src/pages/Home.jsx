import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import ListingsIndex from "../components/ListingsIndex";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <h1>La Marketplace de l'immo</h1>
      <Hero />
      <h1>Liste des biens immobiliers</h1>
      <ListingsIndex/>
    </div>
  );
}
