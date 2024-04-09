const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lodgingSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Couch", "Full Bedroom", "Bed in Shared Bedroom"],
  },
  amenities: {
    type: Array,
    default: [
      "wifi",
      "private bathroom",
      "garden",
      "pet-friendly",
      "air conditioner",
      "kitchen",
      "heating",
    ],
  },
  maxGuests: { type: Number, required: true, min: 1 },
  maxStay: { type: Number, required: true, min: 1 },
  images: {
    type: Array,
  },
  // host: { type: mongoose.Schema.Types.ObjectId, ref: "Host" },
  observations: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
});

const Lodging = mongoose.model("Lodging", lodgingSchema);

module.exports = Lodging;
