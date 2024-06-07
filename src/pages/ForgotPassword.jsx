import { useAtomValue } from "jotai";
import { useState } from "react";
import { isAuthAtom } from "../app/atoms";
import { Navigate } from "react-router-dom";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const isLoggedIn = useAtomValue(isAuthAtom);
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  // soumission formulaire + requete singin
  const handleSubmit =()=>{
    
  } 

  return (
    <section>
      <h1>ForgotPassword</h1>
      {error && <p>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" required name="email" />
        </div>
        <button type="submit">Enovoyer</button>
      </form>
    </section>
  );
}
