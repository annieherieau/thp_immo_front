import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { redirectTo, removeCookie } from "../app/utils";
import hamburgerIcon from "../assets/hamburgerIcon.svg";
import CityFilter from "./CityFilter";
import { NavLink } from "react-router-dom";

export default function Header() {
  const isLoggedIn = useAtomValue(isAuthAtom);

  // Déconnexion
  const handleLogout = () => {
    removeCookie();
    redirectTo();
  };

  const toggleMenu = (event) => {
    alert("Displaytoggle");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Accueil</NavLink>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to="/login">Connexion</NavLink>
              </li>
              <li>
                <NavLink to="/register">Inscription</NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/profile">Mon profile</NavLink>
              </li>
              <li>
                <NavLink to="/user_settings">Mes informations</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Se déconnecter</button>
              </li>
            </>
          )}
        </ul>
        {/* toggleMenu */}
        <button className="p-4 lg:hidden" onClick={toggleMenu}>
          <img src={hamburgerIcon} width="20px" />
        </button>
      </nav>
    </header>
  );
}
