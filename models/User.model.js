const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: Number,
    },
    profilePicture: {
      type: String,
    },
    aboutMe: { type: String },
    location: { type: String },
    age: { type: Number }, //later: change it to birthday and calculate age according to that
    occupation: { type: String },
    languages: {
      type: [String],
      enum: [
        "English",
        "Spanish",
        "French",
        "German",
        "Portuguese",
        "Dutch",
        "Other",
      ],
    },
    lodgings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lodging" }],
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  }
  //add years hosting using timestamps?
  // {
  //   // this second object adds extra properties: `createdAt` and `updatedAt`
  //   timestamps: true,
  // }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
