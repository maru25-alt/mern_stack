const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: String,
  message: String,
  timestamp: Number, // String is shorthand for {type: String}
});

const MessageModel = mongoose.model("Message", messageSchema, "accounts");
module.exports = MessageModel;
