import { Schema, model, models } from "mongoose";

export type UserType = {
  email: string;
  hash: string;
  _id: string;
}

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: String,
});

export const User = models.User || model("User", schema);
