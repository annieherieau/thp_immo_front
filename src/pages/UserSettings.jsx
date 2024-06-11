import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { useEffect } from "react";
import UserInfos from "../components/UserInfos";
import UserForm from "../components/UserForm";

export default function UserSettings() {
  const { id, token } = useAtomValue(userAtom);

  const [error, setError] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [updateUser, setUpdateUser] = useState(false);
  const { url, options } = buildRequestOptions("users", "profile", {
    token: token,
  });

  function handleResponse(response) {
    if (response.status.code == 200) {
      setUser(response.user);
    } else {
      setError(`${response.status.code} : ${response.status.message}`);
    }
  }
  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => handleResponse(response))
      .catch((err) => console.error(err));
  }, [id]);
  // useEffect(() => {}, [updateUser]);
  if (user) {
    return (
      <section>
        <h1>Mes informations</h1>
        {!updateUser && (
          <>
            <UserInfos user={user} />
            <button
              onClick={() => {
                setUpdateUser((updateUser) => !updateUser);
              }}
            >
              Modifier mes informations
            </button>
          </>
        )}
        {updateUser && <UserForm user={user} />}
      </section>
    );
  } else {
    return (
      <section>
        <h1>Mes informations</h1>
        {error && <p>{error}</p>}
      </section>
    );
  }
}
