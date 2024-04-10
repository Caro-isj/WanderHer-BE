const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const ActivityModel = require("../models/Activity.model");
const UserModel = require("../models/User.model");

//get activities
router.get("/", (req, res, next) => {
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

//get activity by id
router.get("/:activityId", (req, res, next) => {
  const { activityId } = req.params;
  ActivityModel.findById(activityId)
    .populate({ path: "host", select: "-password" })
    .then((foundActById) => {
      res.status(200).json(foundActById);
    })
    .catch((err) => {
      res.status(500).json({ message: "error while retrieving activity", err });
      next(err);
    });
});

// post activity
router.post("/", isAuthenticated, (req, res, next) => {
  const activity = { ...req.body, host: req.payload._id };
  ActivityModel.create(activity)
    .then((newActivity) => {
      return UserModel.findByIdAndUpdate(
        req.payload._id,
        { $push: { activities: newActivity._id } },
        { new: true }
      ).populate("activities");
    })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.json({ updatedUser, message: "user updated" });
    })
    .catch((error) => {
      res.status(500).json({ message: "error while loading activity" });
      console.log(error);
      next(error);
    });
});

//delete activity
router.delete("/:activityId", (req, res, next) => {
  const { activityId } = req.params;
  ActivityModel.findByIdAndDelete(activityId)
    .then((deletedActivity) => {
      res.status(200).send();
      console.log("deleted activity successfully", deletedActivity);
    })
    .catch((error) => {
      res.status(500).json({ message: "error while deleting activity", error });
      next(error);
    });
});

//update activity
router.put("/:activityId", (req, res, next) => {
  const { activityId } = req.params;
  ActivityModel.findByIdAndUpdate(activityId, req.body, { new: true })
    .then((updatedActivity) => {
      res.status(200).json(updatedActivity);
      console.log(updatedActivity);
    })
    .catch((error) => {
      res.status(500).json({ message: "error updating activity", error });
      console.log("error updating activity", error);
      next(error);
    });
});

module.exports = router;
