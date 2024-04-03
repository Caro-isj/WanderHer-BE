const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: String,
    firstName: String,
    lastName: String,
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
      unique: true,
    },
    profilePicture: {
      type: String,
      default:
        "assets/create-pastel-gradient-highlight-covers-for-your-instagram.jpeg",
    },
  }
  // {
  //   // this second object adds extra properties: `createdAt` and `updatedAt`
  //   timestamps: true,
  // }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
