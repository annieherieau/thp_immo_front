import Cookies from "js-cookie";

// ****** REDIRECTION ******* //
export function redirectTo(location = "/") {
  const basename = import.meta.env.VITE_BASENAME;
  window.location.replace(`${basename}${location}`);
}

// ****** COOKIES ******* //
export const cookie_name = import.meta.env.VITE_COOKIE_NAME;

export function createCookie(userData, remember=false) {
  Cookies.set(cookie_name, JSON.stringify(userData), {
    expires: remember ? 30 : 1/48,
  });
}

export function loadCookie() {
  return Cookies.get(cookie_name) ? JSON.parse(Cookies.get(cookie_name)) : null;
}

export function updateCookie(email) {
  const data = { ...loadCookie(), email };
  Cookies.set(cookie_name, JSON.stringify(data));
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