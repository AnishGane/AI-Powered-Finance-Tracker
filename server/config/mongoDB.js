import mongoose from "mongoose";

const mongoDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });
  await mongoose.connect(`${process.env.MONGO_URI}`);
};

export default mongoDB;
