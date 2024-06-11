
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
    url: api_url + "/myprofile",
  },
  signout: {
    method: "DELETE",
    url: api_url + "/{ressource}/sign_out",
  },
  reset_password: {
    method: "POST",
    url: api_url + "/{ressource}/password",
  },
  update_password: {
    method: "PUT",
    url: api_url + "/{ressource}/password",
  },
  update_user:{
    method: "PUT",
    url: api_url + "/{ressource}",
  },
  show_email:{
    method: "GET",
    url: api_url + "/email/{:id}",
  },
  // RESSOURCES
  index: {
    method: 'GET',
    url: api_url + "/{ressource}"
  },
  create: {
    method: 'POST',
    url: api_url + "/{ressource}"
  },
  show: {
    method: 'GET',
    url: api_url + "/{ressource}/{:id}"
  },
  update: {
    method: 'PUT',
    url: api_url +  "/{ressource}/{:id}"
  },
  delete: {
    method: 'DELETE',
    url: api_url +  "/{ressource}/{:id}"
  },
  // CUSTOM ENDPOINTS
  my_listings: {
    method: 'GET',
    url: api_url + "/my_listings"
  },
  index_per_city: {
    method: 'GET',
    url: api_url + "/cities/{:id}/{ressource}"
  }
};

// création de la requête: options et url
export function buildRequestOptions(ressource, endpoint, data = { id: null, body: null, token: null, isFormData: false }) {
  const { id, body, token, isFormData } = data;
  const { method, url } = endpoints[endpoint];
  let requestUrl = url.replace("{ressource}", ressource);
  requestUrl = id ? requestUrl.replace("{:id}", id) : requestUrl;

  const options = {
    method: method,
    headers: {},
  };

  if (isFormData) {
    options.body = body;
  } else if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return { url: requestUrl, options: options };
}

