import express from "express";
import AdsModel from "../../db/models/AdsModel";
const route = express.Router();

route.post("/", async (req, res) => {
  const { name, slogan, siteUrl, imageUrl, address, phoneNumber } = req.body;
  const ads = {};
  ads.phoneNumber = phoneNumber;
  ads.name = name;
  ads.slogan = slogan;
  ads.siteUrl = siteUrl;
  ads.imageUrl = imageUrl;

  ads.address = address;

  let adsModel = new AdsModel(ads);

  await adsModel.save();

  res.json(ads);
});

route.get("/", async (req, res) => {
  const ads = await AdsModel.find();

  res.json(ads);
});

route.get("/:id", async (req, res) => {
  const ad = await AdsModel.find({ _id: req.params.id });

  res.json(ad);
});

route.delete("/:id", async (req, res) => {
  const ad = await AdsModel.deleteOne({ _id: req.params.id });
  res.json("deleted" + { ad });
});

module.exports = route;
