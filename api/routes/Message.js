import MessageModel from "../../db/models/MessageModel";

const express = require("express");
const route = express.Router();

route.post("/", async (req, res) => {
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

route.get("/", async (req, res) => {
  const messages = await MessageModel.find();

  res.json(messages);
});

route.get("/:id", async (req, res) => {
  const clinics = await MessageModel.find({ _id: req.params.id });

  res.json(clinics);
});

module.exports = route;
