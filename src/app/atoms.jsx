import { atom } from "jotai";
export const noUser = {
  email: null,
  id: null,
  token: null
}

export const userAtom = atom(noUser);

export const isAuthAtom = atom((get) =>
  get(userAtom).id && get(userAtom).token ? true : false
);
export const cityAtom = atom(null);
export const listingsAtom = atom(undefined)
export const themeAtom = atom({
  theme: "",
});
