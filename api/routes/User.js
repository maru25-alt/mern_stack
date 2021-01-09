import UsersModel from "../../db/models/UsersModel";

const express = require("express");
const route = express.Router();

route.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let user = {};

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = password;
  let userModel = new UsersModel(user);
  await userModel.save();
  res.json(userModel);
});

module.exports = route;
