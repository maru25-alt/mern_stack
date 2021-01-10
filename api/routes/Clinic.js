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
  const clinics = await ClinicModel.find({ account: "clinic" });

  res.json(clinics);
});

route.get("/:id", async (req, res) => {
  const clinics = await ClinicModel.find({ _id: req.params.id });

  res.json(clinics);
});

module.exports = route;
