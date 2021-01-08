import express from "express";
import ClinicModel from "./models/ClinicModel";
import UsersModel from "./models/UsersModel";
import MessageModel from "./models/MessageModel";
import { uploader } from "./util";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

const mongoose = require("mongoose");

run().catch((error) => console.log(error.stack));

async function run() {
  await mongoose.connect("mongodb://localhost:27017/kapstone1", { useUnifiedTopology: true, useNewUrlParser: true });
}

//get / post request from clinics Collection

app.get("/api/clinics", async (req, res) => {
  const clinics = await ClinicModel.find();

  res.json(clinics);
});

app.post("/api/clinics", async (req, res) => {
  const clinic = await new ClinicModel(req.body);

  mongoose.connection.collection("clinics").insertOne(clinic);

  res.json(clinic);
});

//get / post request from users Collection

app.get("/api/users", async (req, res) => {
  const users = await UsersModel.find();
  res.json(users);
});

app.post("/api/users", uploader.single("photoUrl"), async (req, res) => {
  const { name, password, email } = req.body;

  const user = await new UsersModel({
    name: name,
    password: password,
    email: email,
    photoUrl: req.file.filename,
  });
  mongoose.connection.collection("users").insertOne(user);
  res.json(user);
});

//get / post request from messages Collection

app.get("/api/messages", async (req, res) => {
  const message = await MessageModel.find();
  res.json(message);
});
app.post("/api/messages", async (req, res) => {
  const message = await new MessageModel(req.body);
  mongoose.connection.collection("messages").insertOne(message);
  res.send(message);
});

app.listen(4000);

export default app;
