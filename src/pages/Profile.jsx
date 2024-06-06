import { useAtomValue } from "jotai"
import { userAtom } from "../app/atoms"

export default function Profile() {
  const user = useAtomValue(userAtom);
  return(<h1>Profile {user.email}</h1>)
}