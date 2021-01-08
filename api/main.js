import express from "express";
import ClinicModel from "./models/ClinicModel";
import UsersModel from "./models/UsersModel";
import MessageModel from "./models/MessageModel";
import bodyParser from "body-parser";

import cors from "cors";
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/kapstone1";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

//get / post request from clinics Collection

app.get("/api/clinics", (request, response) => {
  MongoClient.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },

    async function (err, db) {
      if (err) throw err;
      let kapstone = db.db("kapstone1");
      await kapstone
        .collection("clinics")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          const Clinics = result;

          db.close();
          response.send(Clinics);

          // send the latest 40 messages and the full user list, annotated with active flags
        });
    },
  );
});

app.post("/api/clinics", (req, res) => {
  MongoClient.connect(
    url,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    async function (err, db) {
      if (err) throw err;
      var dbo = db.db("kapstone1");

      const Clinic = new ClinicModel(req.body);

      await dbo.collection("clinics").insertOne(Clinic);

      // Send back the successful response.
      res.status(201);

      res.send(Clinic);
    },
  );
});

//get / post request from users Collection

app.get("/api/users", (req, res) => {
  MongoClient.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },

    async function (err, db) {
      if (err) throw err;
      let kapstone = db.db("kapstone1");
      await kapstone
        .collection("users")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          const Users = result;
          db.close();

          res.send(Users);

          // send the latest 40 messages and the full user list, annotated with active flags
        });
    },
  );
});

app.post("/api/users", async (req, res) => {
  MongoClient.connect(
    url,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    async function (err, db) {
      if (err) throw err;
      var dbo = db.db("kapstone1");

      const User = new UsersModel(req.body);

      await dbo.collection("users").insertOne(User);

      // Send back the successful response.
      res.status(201);

      res.send(User);
    },
  );
});

//get / post request from messages Collection

app.get("/api/messages", async (req, res) => {
  MongoClient.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },

    async function (err, db) {
      if (err) throw err;
      let kapstone = db.db("kapstone1");
      await kapstone
        .collection("messages")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          const Clinics = result;

          db.close();
          res.send(Clinics);

          // send the latest 40 messages and the full user list, annotated with active flags
        });
    },
  );
});
app.post("/api/messages", async (req, res) => {
  MongoClient.connect(
    url,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    async function (err, db) {
      if (err) throw err;
      var dbo = db.db("kapstone1");

      const Message = new UsersModel(req.body);

      await dbo.collection("messages").insertOne(Message);

      // Send back the successful response.
      res.status(201);

      res.send(Message);
    },
  );
});

app.listen(4000);

export default app;
