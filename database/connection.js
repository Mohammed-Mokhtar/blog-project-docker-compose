import mongoose from "mongoose";

export const databaseConnection = () => {
  const connectionString =
    process.env.MONGODB_URI || "mongodb://localhost:27017/testDb";

  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log("something went wrong", err);
    });
};
