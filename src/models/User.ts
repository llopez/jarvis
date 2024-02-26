import { Schema, model, models } from "mongoose";

const schema = new Schema({ email: String, hash: String });

export const User = models.User || model('User', schema);
