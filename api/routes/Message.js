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
  const accounts = await MessageModel.find();
  const clinics = accounts.filter((u) => u.account === "clinic");
  res.json(clinics);
});

module.exports = route;
