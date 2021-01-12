const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: String,
  body: String,
  timestamp: Number, // String is shorthand for {type: String}
});

const MessageModel = mongoose.model("Message", messageSchema, "messages");
module.exports = MessageModel;
