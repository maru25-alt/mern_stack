const mongoose = require("mongoose");

const { Schema } = mongoose;

const clinicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  address: {
    st: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
  },

  doctors: [
    {
      name: String,
      speacialty: String,
      degrees: [],
      yearsExpiericence: Number,
    },
  ],
  url: String,
  surgeries: [],
  comments: [{ sender: String, message: String, recommend: Boolean }],
});

// Explicitly create the collection before using it
// so the collection is capped.

const ClinicModel = mongoose.model("clinic", clinicSchema, "accounts");
module.exports = ClinicModel;

// The alternative to the export model pattern is the export schema pattern.
