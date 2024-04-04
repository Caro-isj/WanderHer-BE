const router = require("express").Router();
const ActivityModel = require("../models/Activity.model");

//get activities
router.get("/", (req, res, next) => {
  ActivityModel.find({})
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
    .then((foundACtById) => {
      res.status(200).json(foundACtById);
    })
    .catch((err) => {
      res.status(500).json({ message: "error while retrieving activity", err });
      next(err);
    });
});

// post activity
router.post("/", (req, res, next) => {
  ActivityModel.create(req.body)
    .then((newActivity) => {
      res.json({ newActivity, message: "activity created successfully" });
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
