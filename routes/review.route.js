const router = require("express").Router();
const ReviewModel = require("../models/Review.model");

//get review list

router.get("/", (req, res, next) => {
  ReviewModel.find({})
    .then((reviews) => {
      console.log("here are all the reviews", reviews);
      res.json(reviews);
    })
    .catch((error) => {
      console.log("error while fetching reviews", error);
      res.status(500).json({ message: "failed to retrieve reviews", error });
      next(error);
    });
});

// get review by lodging id
router.get("/:lodgingId", (req, res, next) => {
  const { lodgingId } = req.params;
  ReviewModel.find({ property: lodgingId })
    .then((reviews) => {
      console.log("here are all the reviews", reviews);
      res.json(reviews);
    })
    .catch((error) => {
      console.log("error while fetching reviews", error);
      res.status(500).json({ message: "failed to retrieve reviews", error });
      next(error);
    });
});

//post review
router.post("/", (req, res, next) => {
  ReviewModel.create(req.body)
    .then((newReview) => {
      console.log("new review added", newReview);
      res.json({ newReview, message: "Your review was created!" });
    })
    .catch((error) => {
      res.status(500).json({ message: "error creating review", error });
      next(error);
    });
});

//update review
router.put("/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;
  ReviewModel.findByIdAndUpdate(reviewId, req.body, { new: true })
    .then((updatedReview) => {
      res.status(200).json(updatedReview);
      console.log("review updated", updatedReview);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

//delete review
router.delete("/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;
  ReviewModel.findByIdAndDelete(reviewId)
    .then((deletedReview) => {
      res.status(200).json(deletedReview);
      console.log("deleted successfully", deletedReview);
    })
    .catch((error) => {
      res.status(500).json({ message: "error while deleting review", error });
      console.log("error while deleting review", error);
      next(err);
    });
});

module.exports = router;
