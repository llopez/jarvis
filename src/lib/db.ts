import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGOOSE!);
    console.log('db connected', process.env.MONGOOSE!);
  } catch (error) {
    console.log(error);
  }
}