import { useAtomValue } from "jotai";
import { isAuthAtom } from "./atoms";

const api_url = import.meta.env.VITE_BACK_API_URL;

const endpoints = {
  // USERS
  signup: {
    method: "POST",
    url: api_url + "/{ressource}",
  },
  signin: {
    method: "POST",
    url: api_url + "/{ressource}/sign_in",
  },
  profile: {
    method: "GET",
    url: api_url + "/profile",
  },
  signout: {
    method: "DELETE",
    url: api_url + "/{ressource}/sign_out",
  },
  reset_password:{
    method: "POST",
    url: api_url + "/{ressource}/password",
  },
  update_password:{
    method: "PUT",
    url: api_url + "/{ressource}/password",
  },
  // RESSOURCES
  index:{
    method: 'GET',
    url: api_url + "/{ressource}"
  },
  create:{
    method: 'POST',
    url: api_url + "/{ressource}"
  },
  show:{
    method: 'GET',
    url: api_url + "/{ressource}/{:id}"
  },
  update:{
    method: 'PUT',
    url: api_url +  "/{ressource}/{:id}"
  },
  delete:{
    method: 'DELETE',
    url: api_url +  "/{ressource}/{:id}"
  }
 
}

// création de la requête: options et url
export function buildRequestOptions(ressource, endpoint, data= { id: null, body: null, token: useAtomValue(isAuthAtom).token}){
  const { id, body, token } = data;
  const { method, url } = endpoints[endpoint];
  let requestUrl = ressource ? url.replace("{ressource}", ressource) : url;
  requestUrl = id ? url.replace("{:id}", id) : requestUrl;
  
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return { url: requestUrl, options: options };
}