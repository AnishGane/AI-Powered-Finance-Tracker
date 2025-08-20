import mongoose from "mongoose";

const mongoDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });
  await mongoose.connect(`${process.env.MONGO_URI},{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // make sure SSL is enabled
    tlsAllowInvalidCertificates: true, // temporary fix if cert mismatch
    }`);
};

export default mongoDB;
