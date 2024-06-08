
import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { checkPasswords, redirectTo } from "../app/utils";
import { useSearchParams } from "react-router-dom";

export default function UpdatePassword() {
  const [error, setError] = useState("");
  const [searchParams, ] = useSearchParams();
  const token = searchParams.get('reset_password_token');
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
    const { url, options } = buildRequestOptions("update_password", {
      body: { password: userData.password }, token: token
    });
console.log(options);
    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const { data, status } = await response.json();
        if (status.code == 200) {
          alert(status.message)
          redirectTo('/login')
        } else {
          setError(`Erreur ${status.code}: ${status.message}`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section>
      <h1>Changez votre mot de passe</h1>
      {error && <p>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Nouveau Mot de passe</label>
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
        <button type="submit">Enrgistrer</button>
      </form>
    </section>
  );
}
