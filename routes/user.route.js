const router = require("express").Router();
const UserModel = require("../models/User.model");

const uploader = require("../middleware/cloudinary.config");

//get all USER
router.get("/", (req, res, next) => {
  UserModel.find({})

    .populate({ path: "activities" })
    .populate({ path: "lodgings" })
    .then((allUser) => {
      console.log("Found users ->", allUser);
      res.status(200).json(allUser);
    })
    .catch((err) => {
      console.log("Didn't found all users ->", err);
      res.status(500).json({ message: "Failed to get all users" });
    });
});

//Get USER details
router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .populate({ path: "activities" })
    .populate({ path: "lodgings" })
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

// Update user profile route
router.put("/:userId", uploader.single("profilePicture"), (req, res) => {
  const userId = req.params.userId;
  // Get other user profile data from request body
  const {
    userName,
    firstName,
    lastName,
    email,
    phoneNumber,
    aboutMe,
    location,
    age,
    occupation,
    languages,
  } = req.body;

  // path of the uploaded profile picture
  const profilePicturePath = req.file?.path;

  // console.log(req.body, req.file);

  //conditional para age- si el usuario llena la info mostrarla, si no lo hace poner "0" para que no de undefined

  const newLanguage = Array.from(new Set(languages.split(",")));

  // console.log("new language:", newLanguage);

  UserModel.findByIdAndUpdate(
    userId,
    {
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      profilePicture: profilePicturePath,
      aboutMe,
      location,
      age,
      occupation,
      languages: newLanguage,
    },
    { new: true }
  )
    .then((updatedUser) => {
      console.log("User profile updated successfully:", updatedUser);
      res.status(200).json({ message: "Updated user info" });
    })
    .catch((error) => {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed updating your profile" });
    });
});

// delete your account
// router.delete("/", (req, res, next) => {
//   const { email } = req.body;
//   UserModel.findByIdAndDelete({ email }) -A : if you want to use the email it should be findOneAndDelete I guess my little Caro
//     .then((deletedUser) => {
//       console.log("Successfully deleted your account ->", deletedUser);
//       res.status(200).send();
//     })
//     .catch((err) => {
//       console.log("Error deleting your account ->", err);
//       res.status(500).json({ message: "Failed deleting your account" });
//       next(err);
//     });
// });

router.delete("/:userId", (req, res, next) => {
  const { userId } = req.params;
  UserModel.findByIdAndDelete(userId)
    .then((deletedUser) => {
      res.status(204).send();
      console.log("Successfully deleted your account", deletedUser);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed deleting your account", err });
      console.log("Error deleting your account", err);
      next(err);
    });
});

module.exports = router;
