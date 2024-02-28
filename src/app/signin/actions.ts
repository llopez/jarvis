"use server";

import bcrypt from "bcryptjs";
import { connect } from "@/lib/db";
import { User } from "@/models/User";
import { redirect } from "next/navigation";
import { setSession } from "@/app/actions";

type LoginErrorResponse = {
  error: string;
};

type LoginSuccessResponse = undefined;

export type LoginResponseType = LoginErrorResponse | LoginSuccessResponse;

export const login = async (
  prevState: any,
  data: FormData
): Promise<LoginResponseType> => {
  const email = data.get("email")!.toString();
  const password = data.get("password")!.toString();

  connect();

  const user = await User.findOne({ email });

  if (!user) {
    return { error: "not a member" };
  }

  const valid = await bcrypt.compare(password, user.hash);

  if (!valid) return { error: "wrong password" };

  setSession({
    id: user._id,
    email: user.email,
  });

  redirect("/dashboard");
};
