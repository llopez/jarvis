import { User } from "@/models/User";

export const GET = async (_req: Request, { params } : { params: { id: string } }) => {
  console.log('id', params.id);

  const { id } = params;

  const user = await User.findById(id);

  return Response.json(user);
}

export const DELETE = async (_req: Request, { params } : { params: { id: string } }) => {
  console.log('id', params.id);

  const { id } = params;

  const user = await User.findByIdAndDelete(id);

  return Response.json(user);
}