const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
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
      required: true,
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
