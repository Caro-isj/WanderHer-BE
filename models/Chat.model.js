const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    messages: [
      {
        message: String,
        meta: {
          //the meta array lists the delivered/read status, etc, for each participant of a single message.
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          delivered: Boolean,
          read: Boolean,
        },
      },
    ],
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        delivered: Boolean,
        read: Boolean,
        last_seen: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
