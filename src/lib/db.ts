import mongoose from "mongoose";

mongoose.connection.on("connected", () => console.log("connected"));
mongoose.connection.on("open", () => console.log("open"));
mongoose.connection.on("disconnected", () => console.log("disconnected"));
mongoose.connection.on("reconnected", () => console.log("reconnected"));
mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
mongoose.connection.on("close", () => console.log("close"));

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, { maxPoolSize: 10 });
  } catch (error) {
    console.log(error);
  }
};
