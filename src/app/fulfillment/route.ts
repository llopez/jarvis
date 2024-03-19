import { User } from "@/models/User";
import { NextRequest } from "next/server";

import { handleIntentRequest } from "@/lib/fulfillment";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  console.log("request body", data);

  const accessToken = req.headers.get("authorization")?.split(" ")[1];

  const user = await User.findOne({ accessToken });

  console.log(user)

  return handleIntentRequest(data, user._id);
};
