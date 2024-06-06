
export default function Register() {
  const isLoggedIn = useAtomValue(isAuthAtom);
  if (isLoggedIn) {
   return (<Navigate to='/profile' />)
  }

  return(<h1>Register</h1>)
}