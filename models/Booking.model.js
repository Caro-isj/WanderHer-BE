const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Lodging" },
  // host: { type: mongoose.Schema.Types.ObjectId, ref: "Host" },
  checkIn: { type: Date, required: true, min: Date.now },
  checkOut: {
    type: Date,
    required: true,
    min: () => new Date(+new Date() + 1 * 24 * 60 * 60 * 1000),
  },
  numberOfGuests: { type: Number, required: true, min: 1 },
  price: { type: Number, default: 0 }, //for activities
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
