import { NavLink } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { cityAtom, isAuthAtom, listingsAtom } from "../app/atoms";
import { redirectTo, removeCookie } from "../app/utils";
import hamburgerIcon from "../assets/hamburgerIcon.svg";
import CityFilter from "./CityFilter";
import { buildRequestOptions } from "../app/api";
import { useState } from "react";
import { useEffect } from "react";

export default function Header() {
  const isLoggedIn = useAtomValue(isAuthAtom);

  const [city_id, setCity_id] = useAtom(cityAtom);
  const [requestOptions, setRequestOptions ] = useState(buildRequestOptions("listings", "index"))
  const [, setListings] = useAtom(listingsAtom)
  
  // déconnexion
  const handleLogout = () => {
    removeCookie();
    redirectTo();
  };

  // selection de la ville
  const selectCity = (e)=>{
    setCity_id(parseInt(e.target.value))
  }

  // options de la requête
  useEffect(()=>{
    const endpoint = city_id ? 'index_per_city' : 'index'
    setRequestOptions(buildRequestOptions('listings', endpoint, {id: city_id}))
  }, [city_id])

  // exécution de la requête
  useEffect(() => {
    fetch(requestOptions.url, requestOptions.options)
      .then((response) => response.json())
      .then((response) => setListings(response))
      .catch((err) => console.error(err));
  }, [requestOptions]);

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
        {/* filtre des villes */}
        <CityFilter onChange={selectCity}/>
        {/* toggleMenu */}
        <button className="p-4 lg:hidden" onClick={toggleMenu}>
          <img src={hamburgerIcon} width="20px" />
        </button>
      </nav>
    </header>
  );
}
