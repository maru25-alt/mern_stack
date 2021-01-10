import ClinicModel from "../../db/models/ClinicModel";

const express = require("express");
const route = express.Router();

route.post("/", async (req, res) => {
  const { name, password, email } = req.body;
  let clinic = {};

  clinic.name = name;
  clinic.email = email;

  clinic.password = password;
  clinic.account = "clinic";

  let clinicModel = new ClinicModel(clinic);
  await clinicModel.save();
  res.json(clinic);
});

route.get("/", async (req, res) => {
  const accounts = await ClinicModel.find();
  const clinics = accounts.filter((u) => u.account === "clinic");
  res.json(clinics);
});

module.exports = route;
