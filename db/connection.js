import mongoose from "mongoose";

const URI = "mongodb+srv://kapstone:kenzie@cluster0.ygkd6.mongodb.net/kapstone?retryWrites=true&w=majority";

const connectDb = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("connected");
};

export default connectDb;
