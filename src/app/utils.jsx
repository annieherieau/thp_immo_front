import Cookies from "js-cookie";
import { buildRequestOptions } from "./api";
import { useState } from "react";

// ****** REDIRECTION ******* //
export function redirectTo(location = "/") {
  const basename = import.meta.env.VITE_BASENAME;
  window.location.replace(`${basename}${location}`);
}

// ****** COOKIES ******* //
export const cookie_name = import.meta.env.VITE_COOKIE_NAME;

export function createCookie(userData, remember = false) {
  Cookies.set(cookie_name, JSON.stringify(userData), {
    expires: remember ? 30 : 1 / 48,
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
export function getFormData(form) {
  const data = {};
  for (const [key, value] of new FormData(form).entries()) {
    data[key] = value;
  }
  return data;
}

// validation confirmation de password
export function checkPasswords(
) {
  const password = document.querySelector(`input[name=password]`);
  const confirm = document.querySelector(`input[name=password_confirmation]`);
  if (confirm.value === password.value) {
    confirm.setCustomValidity("");
  } else {
    confirm.setCustomValidity("Passwords do not match");
  }
}

export function getCityName(city_id) {
  const [cityName, setCityName] = useState(undefined)
  const {url, options} = buildRequestOptions("cities", "show", {id: city_id})
  fetch(url, options)
      .then((response) => response.json())
      .then((response) => setCityName(response.name))
      .catch((err) => console.error(err));
  return cityName;
}

export function getUserEmail(user_id) {
  const [userEmail, setUserEmail] = useState(undefined)
  const {url, options} = buildRequestOptions(null, "show_email", {id: user_id})
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => setUserEmail(response.email))
    .catch((err) => console.error(err));
  return userEmail;
}