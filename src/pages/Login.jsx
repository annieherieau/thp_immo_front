import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { createCookie, getFormData, redirectTo } from "../app/utils";
import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const isLoggedIn = useAtomValue(isAuthAtom);
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  // soumission formulaire + requete singin
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const userData = getFormData(event.target);

    // créer la requête
    const { url, options } = buildRequestOptions("signin", {
      body: { user: userData },
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const { data, status } = await response.json();
        console.log(data);
        if (status.code == 200) {
          const cookieData = {
            token: data.token,
            email: data.user.email,
            id: data.user.id,
          };
          createCookie(cookieData, userData.remember_me);
          redirectTo("/profile");
        } else {
          setError(`Erreur ${status.code}: ${status.message}`);
        }
      }
    } catch (error) {
      setError("Invalid Email or Password");
      console.log(error.message);
    }
  };

  return (
    <section>
      <h1>Connexion</h1>
      {error && <p>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" required name="email" id="email" autoComplete="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" required name="password" id="password" />
        </div>
        <div className="form-group">
          <input type="checkbox" name="remember_me"  id="remember_me"/>
          <label htmlFor="remember_me">Se souvenir de moi</label>
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <Link to="/register">Créer un compte</Link>
      <br />
      <Link to="/forgot_password">Mot de passe oublié</Link>
    </section>
  );
}
