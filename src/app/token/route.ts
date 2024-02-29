import { NextRequest } from "next/server";
import { User } from "@/models/User";
import crypto from "crypto";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();

  const client_id = data.get("client_id");
  const client_secret = data.get("client_secret");
  const grant_type = data.get("grant_type");

  const accessToken = crypto.randomBytes(32).toString("hex");

  if (grant_type === "authorization_code") {
    const code = data.get("code");
    const redirect_uri = data.get("redirect_uri");

    const user = await User.findOne({ authorizationCode: code });

    if (!user) {
      return Response.json({ error: "invalid_grant" }, { status: 400 });
    }

    // TODO: request validation

    const refreshToken = crypto.randomBytes(32).toString("hex");
    const expiresIn = 60 * 10; // 10 minutes

    await User.updateOne({ _id: user._id }, { accessToken, refreshToken });

    // TODO: save expiresIn into User

    return Response.json({
      token_type: "Bearer",
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    });
  } else {
    const refresh_token = data.get("refresh_token");

    const user = await User.findOne({ refreshToken: refresh_token });

    if (!user) {
      return Response.json({ error: "invalid_grant" }, { status: 400 });
    }

    // TODO: request validation

    const expiresIn = 60 * 60 * 24; // 1 day
    await User.updateOne({ _id: user._id }, { accessToken });

    // TODO: save expiresIn into User

    return Response.json({
      token_type: "Bearer",
      access_token: accessToken,
      expires_in: expiresIn,
    });
  }
};
