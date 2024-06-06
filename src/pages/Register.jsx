import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { createCookie } from "../app/helpers";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [error, setError] = useState("");
  const isLoggedIn = useAtomValue(isAuthAtom);
  if (isLoggedIn) {
   return (<Navigate to='/profile' />)
  }

  const handleValidation = ()=>{

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // récupérer les données du formulaire
    let form_data = new FormData(event.target);
    let userData = {};
    for (const [key, value] of form_data.entries()) {
      userData[key] = value;
    }

    // créer la requête
    const { url, options } = buildRequestOptions("signup", {
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
          redirectTo("/profile");
        } else {
          setError(`Erreur ${data.status }: ${data.message}`);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1>Créer un compte</h1>
      {error && <p>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Identifiant</label>
          <input type="email" required name="email" />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" required name="password" />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" required name="password_confirmation" />
        </div>
        <button type="submit" onClick={handleValidation}>Se connecter</button>
      </form>
    </section>
  );
}