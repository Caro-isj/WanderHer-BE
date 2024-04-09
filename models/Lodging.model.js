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
      "Wi-Fi",
"Air Conditioning/Heating",
"Essentials ",
"Hot Water",
"Kitchen",
"Coffee Maker",
"Microwave",
"Refrigerator",
"Hangers",
"Hair Dryer",
"Iron",
"Extra Bedding",
"Smoke Detector",
"Carbon Monoxide Detector",
"First Aid Kit",
"Fire Extinguisher",
"TV",
"Washer/Dryer",
"Dishwasher",
"Private Entrance",
"Balcony/Terrace",
"BBQ Grill",
"Garden or Backyard",
"Outdoor Furniture",
"Crib",
"High Chair",
"Baby Safety Gates",
"Step-free access",
"Wide doorways",
"Accessible parking spot",
"Pool",
"Hot Tub",
"Gym",
"Private Parking",
"Clothing Storage",
"Mailbox Access",
"Pet-Friendly Amenities",
"Dedicated Workspace"
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
