import mongoose from "mongoose";

export async function connection() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongo db connected");
    });
    connection.on("error", (error) => {
      console.log("mondo db got into error after connecting", error);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong while connection to the db");
    console.log(error);
  }
}
