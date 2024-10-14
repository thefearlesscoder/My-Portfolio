import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "PORTFOLIO",
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log(`some error in DB connection : ${error}`);
    });
};

export {dbConnection}