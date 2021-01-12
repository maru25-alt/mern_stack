const mongoose = require("../config/mongodb");

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
  address: {
    address: {
      type: String,
    },
    zip: {
      type: Number,
    },
    province: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
     }
  },
  prices: {
    min: {
      type: String,
    },
    max: {
      type: String,
    },
  },
  hours:{
    open: {
      type: String,
    },
    close: {
      type: String,
    },
  },
});

const ClinicModel = mongoose.model("clinics", ClinicSchema, "accounts");
module.exports = ClinicModel;

// The alternative to the export model pattern is the export schema pattern.
