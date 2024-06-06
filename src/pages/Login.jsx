import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { createCookie, redirectTo } from "../app/helpers";
import { redirect } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const isLoggedIn = useAtomValue(isAuthAtom);
  if (isLoggedIn) {
   return (<Navigate to='/profile' />)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    // récupérer les données du formulaire
    let form_data = new FormData(event.target);
    let userData = {};
    for (const [key, value] of form_data.entries()) {
      userData[key] = value;
    }
    // console.log(userData);

    // créer la requête
    const { url, options } = buildRequestOptions("signin", {
      body: { user: userData },
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const data = await response.json();
        console.log(data);
        console.log(data.status);
        console.log(data.message);
        if (data.status == 200) {
          const cookieData = {
            token: data.token,
            email: data.user.email,
            id: data.user.id,
          };
          createCookie(cookieData);
          // redirectTo("/profile");
        } else {
          setError(data.status + " " + data.message);
        }
      }
    } catch (error) {
      setError("Invalide Email or Password");
      console.log(error.message);
    }
  };

  return (
    <section>
      {error && <p>{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Identifiant</label>
          <input type="email" required name="email" />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" required name="password" />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </section>
  );
}
