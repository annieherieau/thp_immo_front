import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { Navigate, useParams } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";
import UpdatePassword from "../components/UpdatePassword";



export default function Password() {
  if (useAtomValue(isAuthAtom)) {
    return <Navigate to="/profile" />;
  }
  const {action} = useParams()
  return(
    <div>
    {action =='reset' && (<ResetPassword />)}
    {action =='edit' && (<UpdatePassword />)}
    </div>
  )
}
