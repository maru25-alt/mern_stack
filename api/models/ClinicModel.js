import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const ClinicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  logo: {
     type: String,
     default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  website: {
    type: String,
    default: ""
  },
  telephone: {
    type: String,
    default: ""
  },
  address: {
    type:{
      address:  String,
      zip: Number,
      state: String,
      country: String
    },
    default: []
  },
  prices: {
    type: {
      min: Number,
      max: Number
    },
    default: {}
  },
  hours:{
    type: {
      open:  String,
      close: String,
    },
    default: {}
  },
  date: { 
    type: Date, default: Date.now
   },
  services: {
    type: Array,
    default: []
  },
  comments: {
    type : [{
      sender: String,
      message: String, 
      recomment: Boolean, 
      date: {type: Date, default: Date.now}
    }],
    default: []
  },
  gallery:{
    type: [
      {
        id: String,
        img: String,
        caption: String
      }
    ],
    default: []
  },
  doctors: {
    type : [{
        name: String,
        speciality: String,
        experience: Number
    }],
    default: []
  }
});

const ClinicModel = mongoose.model("clinics", ClinicSchema, "accounts");
//module.exports = ClinicModel;

export default ClinicModel
// The alternative to the export model pattern is the export schema pattern.
