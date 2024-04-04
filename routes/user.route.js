const router = require("express").Router();
const HostModel = require("../models/Host.model");
const UserModel = require("../models/User.model");

//so we will be able to search for a host ? or only available if you click on his profile on lodging details
//i've only seen it after clicking profile on airbnb. we could start with that -agreed -:D

//Get HOST details

router.get("/:hostId", (req, res, next) => {
  const { hostId } = req.params;
  HostModel.findById(hostId)
    .then((hostById) => {
      console.log("Found host by id", hostById);
      res.status(200).json(hostById);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed finding host by id" });
      next(err);
    });
});

//Get USER details
router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .then((userId) => {
      console.log("Found user by id ->", userId);
      res.status(200).json(userId);
    })
    .catch((err) => {
      console.log("There was an error finding the user details", err);
      res.status(500).json({ message: "Failed retrieving user by id" });
      next(err);
    });
});

module.exports = router;
