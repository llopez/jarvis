import { connect } from '@/lib/db';
import { User } from '@/models/User';

export const GET = async () => {
  await connect();

  const users = await User.find({});

  return Response.json(users);
}