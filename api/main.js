import express from "express";
import ClinicModel from "./models/ClinicModel";
import UsersModel from "./models/UsersModel";
import MessageModel from "./models/MessageModel";
import { uploader } from "./util";

import cors from "cors";
import connectDb from "../db/connection";
connectDb();
const app = express();
const user = require("../api/routes/User");
app.use("/api/user", user);

const Port = process.env.Port || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.use("/api/accounts/users", require("../api/routes/User"));
app.use("/api/ads", require("../api/routes/Ads"));
const mongoose = require("mongoose");

run().catch((error) => console.log(error.stack));

async function run() {
  await mongoose.connect("mongodb://localhost:27017/kapstone1", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  // Clear the database every time. This is for the sake of example only,
  // don't do this in prod :)
}

app.get("/api/clinics", async (req, res) => {
  const clinics = await ClinicModel.find();

  res.json(clinics);
});

app.post("/api/clinics", async (req, res) => {
  const clinic = await new ClinicModel(req.body);

  mongoose.connection.collection("clinics").insertOne(clinic);

  res.json(clinic);
});

app.use("/api/messages", require("../api/routes/Message"));
app.use("/api/accounts/clinics", require("../api/routes/Clinic"));

//get / post request from clinics Collection
app.post("/api/users", async (req, res) => {
  const user = await new UsersModel(req.body);
  mongoose.connection.collection("users").insertOne(user);
  res.json(user);
});

app.post("/api/messages", async (req, res) => {
  const message = await new MessageModel(req.body);
  mongoose.connection.collection("messages").insertOne(message);
  res.send(message);
});

app.get("/api/messages", async (req, res) => {
  const message = await MessageModel.find();
  res.json(message);
});

app.listen(4000);

app.listen(Port, () => console.log("yooo from sever"));
