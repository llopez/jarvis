import { Schema, model, models } from "mongoose";

const schema = new Schema({ email: String, age: Number });

export const User = models.User || model('User', schema);
