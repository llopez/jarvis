import { connect } from '@/lib/db';
import { User } from '@/models/User';
import { NextRequest } from 'next/server';

export const GET = async () => {
  await connect();

  const users = await User.find({});

  return Response.json(users);
}

export const POST = async (request: NextRequest) => {
  await connect();

  const { email, age } = await request.json();

  const user = await User.create({ email, age });

  return Response.json(user, { status: 201 });
}