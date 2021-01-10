import express from "express";

import cors from "cors";
import connectDb from "../db/connection";
connectDb();
const app = express();

const Port = process.env.Port || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.use("/api/accounts/users", require("../api/routes/User"));
app.use("/api/messages", require("../api/routes/Message"));
app.use("/api/accounts/clinics", require("../api/routes/Clinic"));

//get / post request from clinics Collection

app.listen(Port, () => console.log("yooo from sever"));
