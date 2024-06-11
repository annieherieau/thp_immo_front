import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { checkPasswords, createCookie, redirectTo } from "../app/utils";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [error, setError] = useState("");
  const isLoggedIn = useAtomValue(isAuthAtom);
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
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
    const { url, options } = buildRequestOptions("users", "signup", {
      body: { user: userData },
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      
      if (response) {
       
        const responseData = await response.json();
        if (response.status == 201) {
          const cookieData = {
            token: response.headers.get('authorization').split(' ')[1],
            email: responseData.email,
            id: responseData.id,
          };
          createCookie(cookieData, userData.remember_me);
          redirectTo("/profile");
        } else {
          setError(`Erreur ${response.status}: ${JSON.stringify(responseData.errors)}`);
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
          <input
            type="email"
            required
            name="email"
            id="email"
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            required
            name="password"
            id="password"
            onChange={checkPasswords}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">
            Confirmer le Mot de passe
          </label>
          <input
            type="password"
            required
            name="password_confirmation"
            id="password_confirmation"
            onChange={checkPasswords}
          />
        </div>
        <div className="form-group">
          <input type="checkbox" name="remember_me" />
          <label htmlFor="remember_me">Se souvenir de moi</label>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </section>
  );
}
