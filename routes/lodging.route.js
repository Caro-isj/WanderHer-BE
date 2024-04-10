const router = require("express").Router();
const LodgingModel = require("../models/Lodging.model");
const uploader = require("../middleware/cloudinary.config.js");
const UserModel = require("../models/User.model");

//get lodgings

router.get("/", (req, res, next) => {
  LodgingModel.find({})
    .then((lodgings) => {
      //   console.log("lodgings retrieved", lodgings);
      res.json(lodgings);
    })
    .catch((err) => {
      console.log("error while retrieving lodgings", err);
      res.status(500).json({ err: "failed to retrieve lodgings" });
      next(err);
    });
});

//get lodging by Id

router.get("/:lodgingId", (req, res, next) => {
  const { lodgingId } = req.params;
  LodgingModel.findById(lodgingId)
    // .populate("Host")
    .then((lodById) => {
      res.status(200).json(lodById);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "error while retrieving lodging by the Id", err });
      console.log("error while retrieving lodging by the Id", err);
      next(err);
    });
});

//lodging  post
router.post("/", uploader.single("images"), (req, res, next) => {
  let file = req.file;
  req.body.images = file?.path;

  LodgingModel.create(req.body)
    .then((newLod) => {
      //   console.log("new lodging added", newLod);
      res.json({ newLod, message: "Your lodging was created!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "error while creating lodging" });
      console.log(err);
      next(err);
    });
});

//lodging delete

router.delete("/:lodgingId", (req, res, next) => {
  const { lodgingId } = req.params;
  LodgingModel.findByIdAndDelete(lodgingId)
    .then((delLod) => {
      res.status(200).send();
      console.log("deleted lodging successfully", delLod);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "error while deleting lodging by the Id", error });
      console.log("error while deleting lodging by the Id", error);
      next(err);
    });
});

//update lodging by id

router.put("/:lodgingId", (req, res, next) => {
  const { lodgingId } = req.params;
  LodgingModel.findByIdAndUpdate(lodgingId, req.body, { new: true })
    .then((updatedLodging) => {
      res.status(200).json(updatedLodging);
      console.log("updated by Id", updatedLodging);
    })
    .catch((error) => {
      console.log(error);
      next(err);
    });
});

module.exports = router;
