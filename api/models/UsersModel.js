const mongoose = require("../config/mongodb");

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
});

const UsersModel = mongoose.model("users", UserSchema, "accounts");
module.exports = UsersModel;
