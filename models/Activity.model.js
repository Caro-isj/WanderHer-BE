const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  meetingPoint: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  datesAvailable: { type: Date, required: true, default: Date.now },
  startTime: { type: Date, required: true, default: Date.now },
  endTime: { type: Date, required: true, default: Date.now },
  price: { type: Number, required: true },
  images: {
    type: Array,
    required: true,
  },

  host: { type: mongoose.Schema.Types.ObjectId, ref: "Host" },
  //   rating:
  //   reviews:
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
