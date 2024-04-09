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
      //unique phone number makes it impossible to login without it bc it assumes all are null
    },
    profilePicture: {
      type: String,
      default: "assets/profilepic.png",
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
    //add years hosting, lodgings, reviews and activities for hosts
  }
  // {
  //   // this second object adds extra properties: `createdAt` and `updatedAt`
  //   timestamps: true,
  // }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

// HOW TO ADD LOCATION - to add that later

// const GeoSchema = mongoose.Schema({
//   type: {
//     type: String,
//     default: "Point",
//   },
//   coordinates: {
//     type: [Number], //the type is an array of numbers
//     index: "2dsphere"
//   }
// })

// const EventSchema = mongoose.Schema({
//   name: String,
//   creator: String,
//   location: GeoSchema
// })

// And when entering data:

// Event({
//       name,
//       creator,
//       location: { type: "point", coordinates: [longitude, latitude] }
//     })
