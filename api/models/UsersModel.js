import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: { 
    type: Date, default: Date.now
   },
   photoUrl: {
    type: String,
  },
  account: {
    type: String,
    required: true,
  },
  posts: {
    type: [{
      date: {type: Date, default: Date.now},
      caption: String,
      img: String
    }],
    default: []
  }
});

const UsersModel = mongoose.model("users", UserSchema, "accounts");

export default UsersModel;
