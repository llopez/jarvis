"use server";

import { cookies } from "next/headers";
import { createCipheriv, createDecipheriv } from "crypto";
import { connect } from "@/lib/db";
import { User, UserType } from "@/models/User";

type SessionType = {
  id: string;
  email: string;
};

const SESSION_KEY = process.env.SESSION_KEY!;
const SESSION_IV = process.env.SESSION_IV!;

const key = Buffer.from(SESSION_KEY, "hex");
const iv = Buffer.from(SESSION_IV, "hex");
const algorithm = "aes-256-cbc";

const encrypt = (text: string) => {
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(text, "utf8", "base64");
  return `${encrypted}${cipher.final("base64")}`;
};

const decrypt = (encrypted: string) => {
  const decipher = createDecipheriv(algorithm, key, iv);
  const decrypted = decipher.update(encrypted, "base64", "utf8");
  return `${decrypted}${decipher.final("utf8")}`;
};

export const setSession = (session: SessionType): void => {
  const store = cookies();

  const encrypted = encrypt(JSON.stringify(session));

  store.set("session", encrypted);
};

export const getSession = (): SessionType | null => {
  const store = cookies();
  const session = store.get("session");

  if (session?.value) {
    try {
      const decrypted = decrypt(session.value);
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }

  return null;
};

export const removeSession = (): void => {
  const store = cookies();
  store.delete("session");
};

const isAuthenticated = async (): Promise<UserType | null> => {
  const session = getSession();

  if (!session) return null;

  const { id } = session;

  await connect();

  const user = await User.findById(id);

  if (!user) return null;

  return user;
};

export const checkAuth = async (fn: (auth: UserType | null) => Promise<UserType | null> ): Promise<UserType | null> => {
  const auth = await isAuthenticated();

  return await fn(auth);
};
