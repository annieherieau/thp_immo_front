import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  // verifie si User authentifié
  const isAuthenticated = useAtomValue(isAuthAtom);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

