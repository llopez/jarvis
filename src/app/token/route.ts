import { NextRequest } from "next/server";
import { User } from "@/models/User";
import crypto from "crypto";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();

  const client_id = data.get("client_id")?.toString();
  const client_secret = data.get("client_secret")?.toString();
  const grant_type = data.get("grant_type")?.toString();

  console.log({
    client_id,
    client_secret,
    grant_type,
  });

  const accessToken = crypto.randomBytes(32).toString("hex");

  console.log("grant_type", grant_type);

  if (grant_type === "authorization_code") {
    console.log("ADJSADJSDHJSD");

    const code = data.get("code")?.toString();
    const redirect_uri = data.get("redirect_uri")?.toString();

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
    console.log("REFRESH");

    const refresh_token = data.get("refresh_token")?.toString();

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
