import { Link } from "react-router-dom";

export default function UserInfos({ user }) {
  return (
    <div>
      <h2>infos de connexion</h2>
      <p>Email: {user.email}</p>
      <p>Mot de passe: *********</p>
      <h2>infos utilisateurs</h2>
      <p>Firstname: {user.firstname}</p>
      <p>Lastname: {user.lastname}</p>
    </div>
  );
}
