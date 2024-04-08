const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//populate with host

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
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
      //unique phone number makes it impossible to login without it bc it assumes all are null
    },
    profilePicture: {
      type: String,
      default: "assets/profilepic.png",
    },
  }
  // {
  //   // this second object adds extra properties: `createdAt` and `updatedAt`
  //   timestamps: true,
  // }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
