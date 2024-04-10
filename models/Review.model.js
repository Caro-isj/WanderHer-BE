const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Lodging" },
  // host: { type: mongoose.Schema.Types.ObjectId, ref: "Host" },
  title: { type: String },
  comment: { type: String },
  rating: { type: Number, enum: [1, 2, 3, 4, 5] },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
