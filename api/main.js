import express from "express";
import ClinicModel from "./models/ClinicModel";
import UsersModel from "./models/UsersModel";
import MessageModel from "./models/MessageModel";
import bodyParser from "body-parser";
import cors from "cors";
import connectDb from "../db/connection";

//import routes
const user = require("../api/routes/User");
const message = require("../api/routes/Message");
const clinic = require("../api/routes/Clinic");
const ads = require("../api/routes/Ads")

//conect to db
connectDb();

//create app
const app = express();
const PORT = process.env.Port || 4000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

//routes
app.use("/api/messages", message);
app.use("/api/accounts/clinics", clinic);
app.use("/api/user", user);
app.use("/api/ads", ads);



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});










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


app.get("/api/users", async (req, res) => {
  const users = await UsersModel.find();
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const { name, password, email } = req.body;

  const user = await new UsersModel({
    name: req.body.name,
    password: password,
    email: email,
  });
  mongoose.connection.collection("users").insertOne(user);
  res.json(user);
});

app.post("/api/messages", async (req, res) => {
  console.log(req.body);
  const message = await new MessageModel(req.body);
  mongoose.connection.collection("messages").insertOne(message);
  res.send(message);
});

app.get("/api/messages", async (req, res) => {
  const message = await MessageModel.find();
  res.json(message);
});



app.listen(PORT, () => {
  return console.log(`listening on port ${PORT}`)
})