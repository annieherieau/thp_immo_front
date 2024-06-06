import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { createCookie, redirectTo } from "../app/helpers";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [error, setError] = useState("");
  const isLoggedIn = useAtomValue(isAuthAtom);
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  // TODO: validation des mot de passe avant envoi serveur
  function checkPasswords() {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=password_confirmation]");
    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Passwords do not match");
    }
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
      if (response){
        const {data, status} = await response.json();
        if (status.code == 200) {
          const cookieData = {
            token: data.token,
            email: data.user.email,
            id: data.user.id,
          };
          createCookie(cookieData);
          redirectTo("/profile");
        } else {
          setError(`Erreur ${status.code.status}: ${status.message}`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section>
      <h1>Créer un compte</h1>
      {error && <p>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" required name="email" id="email" autoComplete="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" required name="password" id="password"  onChange={checkPasswords}/>
        </div>
        <div className="form-group">
          <label  htmlFor="password_confirmation" >Confirmer le Mot de passe</label>
          <input type="password" required name="password_confirmation" id="password_confirmation" onChange={checkPasswords} />
        </div>
        <button type="submit">
          Se connecter
        </button>
      </form>
    </section>
  );
}
