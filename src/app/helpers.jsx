import { useAtomValue } from "jotai";
import { isAuthAtom} from "./atoms";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

// ****** REDIRECTION ******* //
export function redirectTo(location = "/") {
  const basename = import.meta.env.VITE_BASENAME;
  window.location.replace(`${basename}${location}`);
}

export function PrivateRoute({ children }) {
  // verifie si User authentifié
  const isAuthenticated = useAtomValue(isAuthAtom);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

// ****** COOKIES ******* //
export const cookie_name = import.meta.env.VITE_COOKIE_NAME;

export function createCookie(userData) {
  Cookies.set(cookie_name, JSON.stringify(userData), {
    expires: 30,
  });
}

export function loadCookie() {
  return Cookies.get(cookie_name) ? JSON.parse(Cookies.get(cookie_name)) : null;
}

export function updateCookie(email) {
  const data = { ...loadCookie(), email };
  Cookies.set(cookie_name, JSON.stringify(data), { expires: 30 });
}

export function removeCookie() {
  Cookies.remove(cookie_name);
}

// ***** FORMS *****/
// récupérer les données du formulaire
export function getFormData(form){
   const data = {};
   for (const [key, value] of new FormData(form).entries()) {
     data[key] = value;
   }
   return data;
}