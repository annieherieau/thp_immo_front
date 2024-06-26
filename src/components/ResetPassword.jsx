import { useAtomValue } from "jotai";
import { useState } from "react";
import { getFormData, redirectTo } from "../app/utils";
import { buildRequestOptions } from "../app/api";

export default function ResetPassword() {
  const [error, setError] = useState("");

  // soumission formulaire + requete singin
  const handleSubmit = async (event)=>{
    event.preventDefault();
    setError("");

    const userData = getFormData(event.target);
    // créer la requête
    const { url, options } = buildRequestOptions("users", "reset_password", {
      body: { email: userData.email}
    });

     // Executer la requête
     try {
      const response = await fetch(url, options);
        if (response) {
          const { status } = await response.json();
          if (status.code == 200) {
            alert(status.message)
            redirectTo()
          } else {
            setError(`Erreur ${status.code}: ${status.message}`);
          }
        }
      } catch (error) {
        setError("Something gets wrong!");
        console.log(error.message);
      }
  } 

  return (
    <section>
      <h1>ForgotPassword</h1>
      {error && <p>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" required id="email" name="email" autoComplete="email" />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
}
