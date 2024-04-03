const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
    default:
      "assets/create-pastel-gradient-highlight-covers-for-your-instagram.jpeg",
  },
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
