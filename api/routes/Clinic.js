import ClinicModel from "../../db/models/ClinicModel";

const express = require("express");
const route = express.Router();

route.post("/", async (req, res) => {
  const { name, password, address, url } = req.body;
  let clinic = {};

  clinic.name = name;
  clinic.password = password;
  clinic.address = address;
  clinic.url = url;

  let clinicModel = new ClinicModel(clinic);
  await clinicModel.save();
  res.json(clinic);
});

module.exports = route;
