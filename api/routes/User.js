import UsersModel from "../../db/models/UsersModel";

const express = require("express");
const route = express.Router();

const users = [];

route.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  let user = {};

  user.name = name;
  user.email = email;
  user.password = password;
  user.account = "user";

  let userModel = new UsersModel(user);
  await userModel.save();
  res.json(userModel);
});

route.get("/", async (req, res) => {
  const accounts = await UsersModel.find();
  const user = accounts.filter((u) => u.account === "user");

  res.json(user);
});

module.exports = route;
