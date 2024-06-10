import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { useEffect } from "react";

export default function Profile() {
  const { id, token } = useAtomValue(userAtom);
  console.log(token);
  const [error, setError] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const { url, options } = buildRequestOptions("users", "profile", {
    token: token,
  });
 
  function handleResponse(response){
    if (response.status.code == 200){
      setUser(response.user)
    } else{
      setError(`${response.status} : ${response.error}`)
    }
  }
  useEffect(() => {
    fetch(url, options)
    .then((response) => response.json())
    .then((response) => handleResponse(response))
    .catch((err) => console.error(err));
  },[id]);

  if (user) {
    return (
      <section>
        <h1>My Profile</h1>
        <h2>infos de connexion</h2>
        <p>Email: {user.email}</p>
        <p>Mot de passe: *********</p>
        <h2>infos utilisateurs</h2>
        <p>Firstname: {user.firstname}</p>
        <p>Lastname: {user.lastname}</p>
      </section>
    );
  } else {
    return (
    <section>
      <h1>My Profile</h1>
      {error && (<p>{error}</p>)}
    </section>
    )
  }
}
