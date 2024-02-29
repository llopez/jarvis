import { Schema, model, models } from "mongoose";

export type UserType = {
  email: string;
  hash: string;
  authorizationCode: string;
  refreshToken: string;
  accessToken: string;
  _id: string;
};

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: String,
  authorizationCode: { type: String, unique: true },
  refreshToken: { type: String, unique: true },
  accessToken: { type: String, unique: true },
});

export const User = models.User || model("User", schema);
