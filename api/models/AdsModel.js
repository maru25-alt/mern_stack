import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const AdsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  siteUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const AdsModel = mongoose.model("ads", AdsSchema, "ads");
export default AdsModel;
