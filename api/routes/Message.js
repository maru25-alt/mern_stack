import MessageModel from "../../db/models/MessageModel";

const express = require("express");
const messageroute = express.Router();

messageroute.post("/", async (req, res) => {
  const { sender, body } = req.body;
  let message = {};

  let timestamp = Date.now();

  message.sender = sender;
  message.body = body;
  message.timestamp = timestamp;

  let messageModel = new MessageModel(message);
  await messageModel.save();
  res.json(message);
});

module.exports = messageroute;
