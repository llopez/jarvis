import { NextRequest } from "next/server";
import { User } from "@/models/User";
import crypto from "crypto";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const client_id = data.get("client_id")?.toString();
  const client_secret = data.get("client_secret")?.toString();
  const grant_type = data.get("grant_type")?.toString();
  // const redirect_uri = data.get("redirect_uri")?.toString();

  if (client_id !== process.env.GOOGLE_CLIENT_ID) {
    return Response.json({ error: "invalid_grant" }, { status: 400 });
  }

  if (client_secret !== process.env.GOOGLE_CLIENT_SECRET) {
    return Response.json({ error: "invalid_grant" }, { status: 400 });
  }

  const accessToken = crypto.randomBytes(32).toString("hex");

  if (grant_type === "authorization_code") {
    const code = data.get("code")?.toString();

    const user = await User.findOne({ authorizationCode: code });

    if (!user) {
      return Response.json({ error: "invalid_grant" }, { status: 400 });
    }

    const refreshToken = crypto.randomBytes(32).toString("hex");
    const expiresIn = 60 * 10; // 10 minutes

    await User.updateOne({ _id: user._id }, { accessToken, refreshToken });

    return Response.json({
      token_type: "Bearer",
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    });
  } else {
    const refresh_token = data.get("refresh_token")?.toString();

    const user = await User.findOne({ refreshToken: refresh_token });

    if (!user) {
      return Response.json({ error: "invalid_grant" }, { status: 400 });
    }

    const expiresIn = 60 * 60 * 24; // 1 day
    await User.updateOne({ _id: user._id }, { accessToken });

    return Response.json({
      token_type: "Bearer",
      access_token: accessToken,
      expires_in: expiresIn,
    });
  }
};
