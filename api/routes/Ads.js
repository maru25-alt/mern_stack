import express from "express";
import AdsModel from "../../db/models/AdsModel";
const route = express.Router();

route.get("/", async (req, res) => {
  const ads = await AdsModel.find();

  res.json(ads);
});

route.post("/", async (req, res) => {
  const { name, doctors, surgeries, address } = req.body;
  const ads = {};

  ads.name = name;
  ads.doctors = doctors;

  ads.surgeries = surgeries;
  ads.address = address;

  let adsModel = new AdsModel(ads);

  await adsModel.save();

  res.json(ads);
});

module.exports = route;
