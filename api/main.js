import express from "express";
import ClinicModel from "./models/ClinicModel";
import UsersModel from "./models/UsersModel";

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

  // Clear the database every time. This is for the sake of example only,
  // don't do this in prod :)
}

app.get("/api/clinic", async (req, res) => {
  const clinics = await ClinicModel.find();

  res.json(clinics);
});

app.post("/api/clinic", async (req, res) => {
  const clinic = await new ClinicModel(req.body);
  mongoose.connection.collection("clinics").insertOne(clinic);

  res.json(clinic);
});

app.get("/api/users", async (req, res) => {
  const users = await UsersModel.find();
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const user = await new UsersModel(req.body);
  mongoose.connection.collection("users").insertOne(user);
  res.json(user);
});
app.listen(4000);

export default app;
