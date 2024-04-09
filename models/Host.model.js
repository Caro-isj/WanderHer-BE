const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostSchema = new Schema({
  aboutMe: { type: String, required: true },
  location: { type: String, required: true },
  languages: {
    type: Array,
    default: [
      "English",
      "Spanish",
      "French",
      "German",
      "Portuguese",
      "Dutch",
      "Other",
    ],
  },
  //   rating:
  //   reviews:
});

const Host = mongoose.model("Host", hostSchema);

module.exports = Host;
