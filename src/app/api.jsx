import { useAtomValue } from "jotai";
import { isAuthAtom } from "./atoms";

const api_url = import.meta.env.VITE_BACK_API_URL;

const endpoints = {
  signup: {
    method: "POST",
    url: api_url + "/users",
  },
  signin: {
    method: "POST",
    url: api_url + "/users/sign_in",
  },
  profile: {
    method: "GET",
    url: api_url + "/profile",
  },
  signout: {
    method: "DELETE",
    url: api_url + "/users/sign_out",
  }
  ,reset_password:{
    method: "POST",
    url: api_url + "/users/password",
  }
}

// création de la requête: options et url
export function buildRequestOptions(endpoint, data=data = { id: null, body: null, token: useAtomValue(isAuthAtom).token}){
  const { id, body, token } = data;
  const { method, url } = endpoints[endpoint];
  const requestUrl = id ? url.replace("{:id}", id) : url;

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