"use server";

import { cookies } from "next/headers";

type SessionType = {
  id: string;
  email: string;
};

export const setSession = (session: SessionType): void => {
  const store = cookies();
  store.set("session", JSON.stringify(session));
};

export const getSession = (): SessionType | null => {
  const store = cookies();
  const session = store.get("session");

  if (session?.value) {
    return JSON.parse(session.value);
  }

  return null;
};

export const removeSession = (): void => {
  const store = cookies();
  store.delete('session');
}
