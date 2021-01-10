const mongoose = require("mongoose");

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
});

const ClinicModel = mongoose.model("clinics", ClinicSchema, "accounts");
module.exports = ClinicModel;

// The alternative to the export model pattern is the export schema pattern.
