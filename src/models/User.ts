import { Schema, model, models } from "mongoose";

export type UserType = {
  email: string;
  hash: string;
  token: string;
  _id: string;
};

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: String,
  token: { type: String, unique: true },
});

export const User = models.User || model("User", schema);
