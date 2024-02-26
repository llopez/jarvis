'use server';

import { connect } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from 'bcryptjs';
import { revalidatePath } from "next/cache";

type RegisterErrorResponse = {
  error: string;
}

type RegisterSuccessResponse = undefined

export type RegisterResponseType = RegisterErrorResponse | RegisterSuccessResponse

export const register = async (prevState: any, data: FormData): Promise<RegisterResponseType> => {
  const email = data.get('email')?.toString();
  const password = data.get('password')?.toString();
  const passwordConfirmation = data.get('password-confirmation')?.toString();

  if (!email) {
    return {error: 'email is blank'}
  }

  if (!password) {
    return {error: 'password is blank'}
  }

  if (password !== passwordConfirmation) {
    return { error: 'password confirmation does not match' }
  }

  await connect();
  const user = await User.findOne({ email });

  if (user) {
    return { error: 'already a member' }
  }

  const hash = await bcrypt.hash(password, 10)

  try {
    await User.create({ email, hash });
  } catch {
    return { error: 'database error' }
  }

  revalidatePath('/register')
}