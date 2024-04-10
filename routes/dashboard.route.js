const router = require("express").Router();
const ActivityModel = require("../models/Activity.model");
const LodgingModel = require("../models/Lodging.model");
const UserModel = require("../models/User.model");

//Get all ACTIVITY
router.get("/activities", (req, res, next) => {
  ActivityModel.find({})
    .populate({ path: "host", select: "-password" })
    .then((activity) => {
      res.json(activity);
    })
    .catch((error) => {
      res.status(500).json({ message: "failed to retrieve activity" });
      next(error);
    });
});

//get all USER
router.get("/users", (req, res, next) => {
  UserModel.find({})
    .then((allUser) => {
      console.log("Found users ->", allUser);
      res.status(200).json(allUser);
    })
    .catch((err) => {
      console.log("Didn't found all users ->", err);
      res.status(500).json({ message: "Failed to get all users" });
    });
});

//get all LODGING
router.get("/lodgings", (req, res, next) => {
  LodgingModel.find({})
    .then((lodgings) => {
      res.json(lodgings);
    })
    .catch((err) => {
      console.log("error while retrieving lodgings", err);
      res.status(500).json({ message: "failed to retrieve lodgings" });
      next(err);
    });
});

module.exports = router;
