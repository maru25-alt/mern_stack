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
  try {
    const clinics = await ClinicModel.find({ _id: req.params.id });

    res.status(200).json(clinics);
  } catch (error) {
    res.status(404).send(`no document found`);
  }
});
route.delete("/:id", async (req, res, d) => {
  const clinic = await ClinicModel.deleteOne({ _id: req.params.id });
  if (d.acknowledged === true && d.deletedCount === 1) res.status(200).send(`deleted ${clinic}`);

  // Use your response code
  res.send("Record doesn't exist or already deleted"); // Use your response code
});

module.exports = route;
