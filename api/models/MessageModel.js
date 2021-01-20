import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const messageSchema = new Schema({
  user1: String,
  user2: String,
  messages: {
    type: [{
      timestamp: {type: Date, default: Date.now},
      text: String,
      sender: String
    }],
    default: []
  },
});

const MessageModel = mongoose.model("Message", messageSchema, "messages");

export default MessageModel;
