const router = require("express").Router();
const ChatModel = require("../models/Chat.model");

//CHAT ROUTE

//get all chats
router.get("/", (req, res, next) => {
  ChatModel.find()
    .then((allMessages) => {
      console.log("Here is all messages from the chat ->", allMessages);
      res.status(200).json(allMessages);
    })
    .catch((err) => {
      console.log("Error retrieving messages ->", err);
      res.status(500).json({ message: "Failed finding the messages" });
      next(err);
    });
});

//create chat
router.post("/", (req, res, next) => {
  ChatModel.create(req.body)
    .then((newMsg) => {
      console.log("New message created ->", newMsg);
      res.status(201).json(newMsg);
    })
    .catch((err) => {
      console.log("Error while creating a new message ->", err);
      res.status(500).json({ message: "Failed created new message" });
      next(err);
    });
});

module.exports = router;
