const mongoose = require("mongoose");

const { Schema } = mongoose;

const AdsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  address: String,

  doctors: [{ name: String, speacility: String }],
  percedures: [{ name: String }],
});

const AdsModel = mongoose.model("ads", AdsSchema, "ads");
module.exports = AdsModel;
