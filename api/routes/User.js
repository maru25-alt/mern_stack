import UsersModel from "../../db/models/UsersModel";

const express = require("express");

const route = express.Router();

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
  const users = await UsersModel.find({ account: "user" });

  res.json(users);
});

route.get("/:id", async (req, res) => {
  const user = await UsersModel.find({ _id: req.params.id });

  res.json(user);
});

module.exports = route;
