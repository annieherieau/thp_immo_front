import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import ListingsIndex from "../components/ListingsIndex";

export default function Home() {
  const isLoggedIn = useAtomValue(isAuthAtom);
  return (
    <section>
      {!isLoggedIn && <h1>Home (puclic)</h1>}
      {isLoggedIn && <h1>Bienvenue (private)</h1>}
      <ListingsIndex/>
    </section>
  );
}
